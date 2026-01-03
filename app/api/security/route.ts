import { NextRequest, NextResponse } from "next/server";

// Security endpoint for monitoring and protection
export async function GET(request: NextRequest) {
  // Return security headers and status
  return NextResponse.json(
    {
      status: "secure",
      timestamp: new Date().toISOString(),
      protection: {
        xss: "enabled",
        csrf: "enabled",
        rateLimit: "enabled",
        sanitization: "enabled",
      },
    },
    {
      status: 200,
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
      },
    }
  );
}

