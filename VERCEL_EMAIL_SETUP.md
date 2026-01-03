# 📧 Email Setup for Vercel Deployment - Complete Guide

## ⚠️ Problem: Contact Form Not Working After Deployment

After deploying to Vercel, your contact form shows "Message sent successfully" but then shows "Something went wrong" because **no email service is configured**.

## ✅ Solution: Setup Resend Email Service

Resend is the easiest and most reliable email service for Next.js apps. It has a free tier perfect for portfolios.

---

## 🚀 Step-by-Step Setup (5 Minutes)

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click **"Sign Up"** (you can use GitHub, Google, or email)
3. Verify your email address
4. **Free tier includes**: 3,000 emails/month, 100 emails/day

### Step 2: Get Your API Key

1. After signing up, go to **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select **"Sending access"** permissions
5. Click **"Add"**
6. **Copy the API key** (starts with `re_...`) - **You'll only see it once!**

### Step 3: Add Domain (Required for Production)

**Important**: Resend requires a verified domain for production emails. But you can use `onboarding@resend.dev` for testing first!

#### Option A: Use Test Domain (Quick Testing)
- The code already uses `onboarding@resend.dev` - this works for testing!
- You'll receive emails, but they come from Resend's test domain
- **Good for**: Testing your form works

#### Option B: Add Your Own Domain (Production)
1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually a few minutes)
6. Update the `from` email in `app/api/contact/route.ts` to use your domain

### Step 4: Add API Key to Vercel

1. Go to your Vercel dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **portfolio project**
3. Go to **"Settings"** (top menu)
4. Click **"Environment Variables"** (left sidebar)
5. Click **"Add New"**
6. Fill in:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here` (paste the key you copied)
   - **Environment**: Select **"Production"** (and "Preview" if you want)
7. Click **"Save"**

### Step 5: Redeploy Your Site

**Important**: After adding environment variables, you MUST redeploy!

1. In Vercel dashboard, go to **"Deployments"**
2. Click the **"⋯"** menu on your latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment to complete

**OR** push a new commit to trigger automatic deployment:

```bash
git add .
git commit -m "Add resend email service"
git push
```

### Step 6: Test the Form

1. Visit your deployed portfolio
2. Go to the "Let's Connect & Build Together" section
3. Fill out the contact form
4. Click "Send Message"
5. Check your email inbox (the one from `profile.contact.email` in `data/profile.ts`)
6. You should receive the message! 🎉

---

## 🔍 Troubleshooting

### Problem: Still getting "Something went wrong"

**Solutions:**
1. ✅ **Check API Key is set**: Go to Vercel → Settings → Environment Variables → Verify `RESEND_API_KEY` exists
2. ✅ **Redeploy**: Environment variables only apply to NEW deployments
3. ✅ **Check API Key format**: Should start with `re_` and be about 50 characters
4. ✅ **Check Resend dashboard**: Go to Resend → Logs to see if emails are being sent

### Problem: Emails not arriving

**Solutions:**
1. ✅ **Check spam folder**: First emails from Resend might go to spam
2. ✅ **Verify recipient email**: Check `data/profile.ts` - `profile.contact.email` should be your email
3. ✅ **Check Resend logs**: Go to Resend dashboard → Logs to see delivery status
4. ✅ **Check domain verification**: If using custom domain, verify it's verified in Resend

### Problem: "Invalid API Key" error

**Solutions:**
1. ✅ **Regenerate API key** in Resend dashboard
2. ✅ **Update in Vercel**: Replace the old key with the new one
3. ✅ **Redeploy**: Must redeploy after changing environment variables

---

## 📝 Quick Reference

### Environment Variable in Vercel:
- **Key**: `RESEND_API_KEY`
- **Value**: `re_your_actual_api_key_here`
- **Environments**: Production (and Preview if needed)

### Files That Need Resend:
- ✅ `package.json` - Resend package is already added
- ✅ `app/api/contact/route.ts` - Email sending code (already configured)
- ✅ Vercel Environment Variables - **YOU NEED TO ADD THIS**

### Current Configuration:
- **From Email**: `Portfolio Contact <onboarding@resend.dev>` (test domain)
- **To Email**: `awais.iqbal.developer@gmail.com` (from `data/profile.ts`)
- **Service**: Resend (configured in code)

---

## 🎯 What Happens When Form is Submitted

1. User fills form and clicks "Send Message"
2. Form shows "Message sent successfully" (optimistic UI)
3. API route (`/api/contact`) receives the data
4. API route uses Resend to send email to your inbox
5. If successful: Form stays cleared, shows success
6. If error: Form data restored, shows error message

---

## ✅ Checklist Before Deploying

- [ ] Resend account created
- [ ] API key generated and copied
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] Site redeployed after adding environment variable
- [ ] Tested the contact form on deployed site
- [ ] Received test email in inbox

---

## 💡 Alternative: SendGrid (If Resend Doesn't Work)

If you prefer SendGrid:

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key from SendGrid dashboard
3. Add to Vercel: `SENDGRID_API_KEY` = `SG.your_key_here`
4. Update `app/api/contact/route.ts` to use SendGrid (code already included)

---

## 📚 Additional Resources

- Resend Documentation: [resend.com/docs](https://resend.com/docs)
- Vercel Environment Variables: [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
- Resend Free Tier: 3,000 emails/month, 100/day (perfect for portfolios!)

---

**Status**: ✅ Resend package is installed, code is ready. **You just need to add the API key to Vercel!**

