# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form on your iMigo website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Go to the [Email Services](https://dashboard.emailjs.com/admin) page
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended):
   - Select "Gmail"
   - Click "Connect Account"
   - Authorize EmailJS to use your Gmail account
4. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to the [Email Templates](https://dashboard.emailjs.com/admin/templates) page
2. Click "Create New Template"
3. Use this template content:

### Subject Line:
```
New Contact Form Submission - {{subject}}
```

### Email Body:
```
You have received a new message from the iMigo contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from the iMigo website contact form.
Reply to: {{from_email}}
```

4. Configure template settings:
   - **To Email**: imigovolunteer@gmail.com
   - **From Name**: iMigo Contact Form
   - **Reply To**: {{from_email}}
5. Click "Save"
6. Note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** (looks like: `abcdef123456789`)

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   ```

3. Replace the placeholder values with:
   - `your_public_key_here` → Your Public Key from Step 4
   - `your_service_id_here` → Your Service ID from Step 2
   - `your_template_id_here` → Your Template ID from Step 3

## Step 6: Test the Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact page: `http://localhost:3000/contact`

3. Fill out and submit the form

4. Check your email (imigovolunteer@gmail.com) for the message

## Optional: Auto-Reply to Users

To send an automatic confirmation email to users:

1. Create a second template in EmailJS
2. Set "To Email" to: `{{from_email}}`
3. Create a friendly confirmation message
4. Update the contact form code to send two emails:
   - One to your team (current implementation)
   - One to the user (auto-reply)

## Troubleshooting

### Emails not sending?
- Check that all environment variables are set correctly
- Verify your EmailJS account is verified
- Check browser console for errors
- Ensure your Gmail account is connected properly

### Getting 403 errors?
- Make sure your Public Key is correct
- Check that your domain is allowed in EmailJS settings

### Form shows "Configuration missing" error?
- Verify all three environment variables are set in `.env.local`
- Restart your development server after changing `.env.local`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- Unlimited templates

This should be more than enough for a volunteer organization's contact form.

## Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- EmailJS uses domain restrictions to prevent abuse
- Add your production domain in EmailJS dashboard settings

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- iMigo Contact: imigovolunteer@gmail.com
