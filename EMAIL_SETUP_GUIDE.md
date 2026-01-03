# Email Setup Guide

## 📧 How Email Sending Works

Your contact form now sends emails directly without opening the email client!

## 🚀 Setup Options

### Option 1: Resend (Recommended - Free Tier Available)

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Install Resend package:**
   ```bash
   npm install resend
   ```
4. **Add to `.env.local`:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
5. **Uncomment the Resend code in `app/api/contact/route.ts`**

### Option 2: SendGrid (Free Tier Available)

1. **Sign up at [sendgrid.com](https://sendgrid.com)**
2. **Get your API key**
3. **Install SendGrid package:**
   ```bash
   npm install @sendgrid/mail
   ```
4. **Add to `.env.local`:**
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ```
5. **Update `app/api/contact/route.ts` to use SendGrid**

### Option 3: Nodemailer with Gmail SMTP

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   ```
2. **Create Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
3. **Add to `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
4. **Update `app/api/contact/route.ts` to use Nodemailer**

## 🔧 Quick Setup (Resend - Easiest)

```bash
# Install Resend
npm install resend

# Add to .env.local
echo "RESEND_API_KEY=re_your_key_here" >> .env.local
```

Then uncomment the Resend code in `app/api/contact/route.ts` (lines 48-57).

## ✅ Testing

After setup, test the contact form:
1. Fill out the form
2. Click "Send Message"
3. Check your email inbox
4. You should receive the message!

## 🔒 Security Features

- ✅ Input sanitization (XSS protection)
- ✅ Rate limiting (5 requests per minute)
- ✅ Email validation
- ✅ SQL injection protection
- ✅ CSRF protection ready

---

**Note:** The email API is ready but needs an email service configured. Choose one of the options above!

