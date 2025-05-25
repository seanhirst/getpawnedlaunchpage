# Formspree Setup for GetPawned Waitlist

The waitlist form has been configured to use Formspree, which will send submissions to your support@getpawned.io email address. Here's how to complete the setup:

## Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io/) and sign up for an account
2. Verify your email address

## Step 2: Create a Form

1. Log in to your Formspree account
2. Click "New Form"
3. Name your form (e.g., "GetPawned Waitlist")
4. For the form endpoint, you'll get a unique URL like `https://formspree.io/f/xrgdopbz`

## Step 3: Update Your Website Code

The current form action in your HTML is set to `https://formspree.io/f/support@getpawned.io`, which needs to be replaced with your actual Formspree endpoint.

```html
<form id="waitlist-form" class="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" id="email" name="email" placeholder="Enter your email" required>
    <input type="hidden" name="_subject" value="New GetPawned Waitlist Signup">
    <button type="submit" class="waitlist-button">JOIN WAITLIST</button>
</form>
```

Replace `YOUR_FORM_ID` with the unique ID from your Formspree form.

## Step 4: Configure Form Settings in Formspree

1. In your Formspree dashboard, click on your form
2. Under "Settings":
   - Set "Reply-To" to use the submitter's email
   - Enable "Email Notifications" to receive emails at support@getpawned.io
   - Customize the confirmation message shown to users after submission
   - Optionally enable reCAPTCHA to prevent spam

3. Under "Integrations" (optional):
   - Connect to services like Slack, Discord, or Zapier for additional notifications
   - Set up webhooks if you want to process submissions programmatically

## Step 5: Test Your Form

1. Submit a test entry on your website
2. Verify that you receive the email at support@getpawned.io
3. Check that the submitter sees an appropriate confirmation message

## Troubleshooting

If emails aren't being received:

1. **Check Spam Folder**: Formspree emails might be filtered as spam initially
2. **Verify Formspree Setup**: Make sure your form is activated in the Formspree dashboard
3. **Email Forwarding**: Confirm that support@getpawned.io is properly forwarding to your primary email
4. **Form ID**: Ensure you're using the correct form ID in your HTML

## Additional Features

Formspree offers several advanced features you might want to use:

1. **Auto-Response Emails**: Send automatic confirmation emails to people who sign up
2. **File Uploads**: Allow users to attach files (on paid plans)
3. **Custom Fields**: Collect additional information beyond just email
4. **Analytics**: Track submission rates and other metrics
5. **Spam Filtering**: Automatically filter out spam submissions

Most of these features are available on Formspree's paid plans.