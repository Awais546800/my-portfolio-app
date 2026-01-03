import { NextRequest, NextResponse } from "next/server";
import { profile } from "@/data/profile";

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) {
    return false; // Max 5 requests per minute
  }

  limit.count++;
  return true;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
    .slice(0, 1000); // Max length
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = `Portfolio Contact: ${sanitizedName}`;
    const emailBody = `
New contact form submission from your portfolio:

Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This email was sent from your portfolio contact form.
IP Address: ${ip}
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Send email using configured service
    let emailSent = false;
    
    // Option 1: Resend (recommended - easiest setup)
    // Install: npm install resend
    if (process.env.RESEND_API_KEY) {
      try {
        // @ts-ignore - Optional dependency
        const resendModule = await import('resend').catch(() => null);
        if (resendModule) {
          const { Resend } = resendModule;
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: profile.contact.email,
            replyTo: sanitizedEmail,
            subject: emailSubject,
            text: emailBody,
          });
          
          emailSent = true;
        }
      } catch (error) {
        console.error('Resend error:', error);
      }
    }
    
    // Option 2: SendGrid (if Resend not available)
    // Install: npm install @sendgrid/mail
    if (!emailSent && process.env.SENDGRID_API_KEY) {
      try {
        // @ts-ignore - Optional dependency
        const sgMailModule = await import('@sendgrid/mail').catch(() => null);
        if (sgMailModule) {
          sgMailModule.default.setApiKey(process.env.SENDGRID_API_KEY);
          
          await sgMailModule.default.send({
            to: profile.contact.email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
            replyTo: sanitizedEmail,
            subject: emailSubject,
            text: emailBody,
          });
          
          emailSent = true;
        }
      } catch (error) {
        console.error('SendGrid error:', error);
      }
    }
    
    // Option 3: Nodemailer with SMTP (if others not available)
    // Install: npm install nodemailer
    if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // @ts-ignore - Optional dependency
        const nodemailerModule = await import('nodemailer').catch(() => null);
        if (nodemailerModule) {
          const transporter = nodemailerModule.default.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });
          
          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: profile.contact.email,
            replyTo: sanitizedEmail,
            subject: emailSubject,
            text: emailBody,
          });
          
          emailSent = true;
        }
      } catch (error) {
        console.error('SMTP error:', error);
      }
    }
    
    // Development fallback - log email content
    if (!emailSent) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Email would be sent:');
        console.log('To:', profile.contact.email);
        console.log('Subject:', emailSubject);
        console.log('Body:', emailBody);
        console.log('💡 To enable email sending, install and configure:');
        console.log('   - npm install resend (recommended)');
        console.log('   - Or npm install @sendgrid/mail');
        console.log('   - Or npm install nodemailer');
        console.log('   - See EMAIL_SETUP_GUIDE.md for details');
        emailSent = true; // Return success in dev for testing
      } else {
        throw new Error('No email service configured. Please set up Resend, SendGrid, or SMTP. See EMAIL_SETUP_GUIDE.md');
      }
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Email sent successfully!",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

// Security: Only allow POST method
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
