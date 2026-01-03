# 🧪 Local Testing Setup for Email Contact Form

## Quick Setup for Local Testing

### Step 1: Install Dependencies

First, install the Resend package:

```bash
cd my-portfolio-app
npm install
```

This will install the `resend` package that we added to `package.json`.

### Step 2: Create `.env.local` File

Create a `.env.local` file in the root directory (`my-portfolio-app/.env.local`):

1. **Get Resend API Key**:
   - Go to [resend.com](https://resend.com)
   - Sign up (free account)
   - Go to API Keys in dashboard
   - Create a new API key
   - Copy the key (starts with `re_...`)

2. **Create `.env.local` file**:
   - In your project root, create `.env.local`
   - Add this line:
     ```
     RESEND_API_KEY=re_your_api_key_here
     ```
   - Replace `re_your_api_key_here` with your actual API key from Resend

**Example `.env.local` file:**
```
RESEND_API_KEY=re_1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 3: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and test the contact form!

### Step 4: Test the Contact Form

1. Navigate to the "Let's Connect & Build Together" section
2. Fill out the form:
   - Your Name
   - Email
   - Message
3. Click "Send Message"
4. Check your email inbox (awais.iqbal.developer@gmail.com)
5. You should receive the email! ✅

---

## 🔍 Troubleshooting

### "Something went wrong" error locally

**Check:**
1. ✅ Is `.env.local` file created in the root directory?
2. ✅ Does it contain `RESEND_API_KEY=re_...`?
3. ✅ Did you restart the dev server after creating `.env.local`?
4. ✅ Is the API key correct (copied from Resend dashboard)?

**Solution:** Restart the dev server after creating/updating `.env.local`:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Email not arriving

1. **Check spam folder** - First emails from Resend might go to spam
2. **Verify recipient email** - Check `data/profile.ts` - should be `awais.iqbal.developer@gmail.com`
3. **Check Resend dashboard** - Go to Resend → Logs to see if email was sent
4. **Verify API key** - Make sure it's correct in `.env.local`

### "Module not found" error

**Solution:** Install dependencies:
```bash
npm install
```

---

## 📝 Important Notes

- ✅ `.env.local` is already in `.gitignore` - it won't be committed to GitHub
- ✅ Never commit your API keys to GitHub
- ✅ The `.env.local` file is only for local development
- ✅ For production (Vercel), you'll add the environment variable in Vercel dashboard

---

## ✅ Success Checklist

- [ ] Resend package installed (`npm install`)
- [ ] `.env.local` file created in root directory
- [ ] `RESEND_API_KEY` added to `.env.local`
- [ ] Dev server restarted after creating `.env.local`
- [ ] Contact form tested and working
- [ ] Email received in inbox

---

**Ready to test!** After local testing works, you can push to GitHub and configure it in Vercel. 🚀

