# Using Google Forms for Waitlist Collection

If you're having issues with email delivery, using Google Forms is a reliable alternative for collecting waitlist signups. Here's how to set it up:

## Step 1: Create a Google Form

1. Go to [forms.google.com](https://forms.google.com/)
2. Create a new form
3. Add a title like "GetPawned Waitlist Signup"
4. Add a brief description explaining what users are signing up for
5. Add an "Email" field (make it required)
6. Optionally add other fields like "Name" or "How did you hear about us?"
7. Click the Settings gear icon and:
   - Under "Responses" tab, toggle "Collect email addresses" to ON
   - Under "Presentation" tab, customize the confirmation message

## Step 2: Get the Form Embed Code

1. Click the "Send" button in the top right
2. Click the `<>` embed tab
3. Copy the provided HTML code

## Step 3: Integrate with Your Website

### Option 1: Embed the Form (Simplest)

Replace the current waitlist form in your index.html with the Google Form embed code:

```html
<div class="waitlist-container">
    <div class="waitlist-text">Join our waitlist to be the first to know when we launch</div>
    <!-- Replace the form below with your Google Form embed code -->
    <iframe src="YOUR_GOOGLE_FORM_URL" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
</div>
```

### Option 2: Style-Matched Integration (Better User Experience)

Keep your existing form design but submit to Google Forms:

1. Create your Google Form with just an email field
2. Get the form action URL by:
   - Inspecting the form HTML
   - Looking for the `<form>` tag and its `action` attribute
   - Copy this URL

3. Update your existing form code:

```html
<form id="waitlist-form" class="waitlist-form" action="YOUR_GOOGLE_FORM_ACTION_URL" method="POST" target="_blank">
    <input type="email" id="email" name="entry.XXXXXXXX" placeholder="Enter your email" required>
    <button type="submit" class="waitlist-button">JOIN WAITLIST</button>
</form>
```

Replace `entry.XXXXXXXX` with the actual field name from your Google Form (find this by inspecting the form).

## Step 4: Set Up Email Notifications

1. In your Google Form, click the "Responses" tab
2. Click the three dots menu (⋮) and select "Get email notifications for new responses"
3. Choose when you want to receive notifications

## Step 5: Access and Manage Submissions

1. All submissions will be stored in a Google Sheet
2. To access this sheet, go to the "Responses" tab and click the Google Sheets icon
3. You can download this data as CSV or Excel file anytime

## Benefits of Using Google Forms

1. **Reliability**: Google's infrastructure ensures high uptime and delivery
2. **No Server-Side Code**: Works with static hosting like GitHub Pages
3. **Spam Protection**: Google's systems help filter out spam submissions
4. **Data Management**: Easy to view, sort, and export submissions
5. **Notifications**: Get instant alerts for new signups

## Customizing the Form Appearance

If you embed the form directly, you can customize its appearance by:

1. In the Google Form editor, click "Customize theme" (palette icon)
2. Change colors to match your website
3. Add your logo
4. Select fonts that complement your site

For the style-matched integration, your existing CSS will apply to the form.