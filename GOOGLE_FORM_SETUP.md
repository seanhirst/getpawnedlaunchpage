# Google Form Integration Setup

The website has been updated to use Google Forms for collecting waitlist emails. This document explains how to complete the setup.

## Google Form Configuration

The integration has been completed with the following details:

- **Form ID**: `1Sn2AUYc_S9h_9sgD0QbRNQlavqGA7LoPkVw_jN7xsiQ`
- **Email Field Entry ID**: `1291602047`
- **Field Name in Form**: `entry.1291602047`
- **Form Submission URL**: `https://docs.google.com/forms/d/1Sn2AUYc_S9h_9sgD0QbRNQlavqGA7LoPkVw_jN7xsiQ/formResponse`

The entry ID was found by inspecting the form's HTML and looking for the input element with a name that starts with `entry.`. The code has been updated to use these values.

**Important Note**: The form ID should be used exactly as it appears in the form URL, without any additional prefixes.

If you need to change the entry ID in the future (for example, if you create a new form), you can:

1. **Find the new entry ID**:
   - Open your Google Form in preview mode
   - Right-click on the email input field
   - Select "Inspect" or "Inspect Element"
   - Look for an input element with a name that starts with `entry.`

2. **Update the code**:
   - Open `index.html`
   - Find line 490 with: `emailField: 'entry.1291602047'`
   - Replace the number with your new entry ID

## Security Features

The integration includes several security features:

1. **URL Obfuscation**: The Google Form ID is base64 encoded to prevent easy scraping
2. **Hidden Form Submission**: The form submits through a hidden iframe to prevent page navigation
3. **Local Backup**: Email addresses are stored in localStorage as a backup
4. **Validation**: Basic email validation is performed before submission

## Testing the Integration

After updating the entry ID:

1. Open the website
2. Enter a test email address
3. Click "JOIN WAITLIST"
4. Verify you see the success message
5. Check your Google Form responses to confirm the submission was received

## Troubleshooting

If submissions aren't working:

1. **Check the Entry ID**: Make sure you've entered the correct entry ID
2. **Form Permissions**: Ensure your Google Form is set to collect responses
3. **Browser Console**: Check for JavaScript errors in the browser console
4. **CORS Issues**: If you encounter CORS errors, you may need to use a different approach

## Alternative Approaches

If this method doesn't work for your needs, consider:

1. **Direct Embed**: Embed the Google Form directly using an iframe
2. **Google Apps Script**: Create a web app with Google Apps Script to handle submissions
3. **Email API**: Use a service like SendGrid or Mailgun with a serverless function
