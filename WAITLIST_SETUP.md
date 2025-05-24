# Waitlist Form Setup Guide

The current implementation of the waitlist form on getpawned.io uses client-side storage (localStorage) for demonstration purposes. To fully implement the email collection and notification system, you'll need to set up a serverless function.

## Current Implementation

The current implementation:
1. Collects the email address from the form
2. Stores it in the browser's localStorage
3. Shows a success message to the user

This is a temporary solution since GitHub Pages doesn't support server-side code execution.

## Production Implementation Options

### Option 1: Netlify Functions (Recommended)

1. **Create a Netlify account** and connect it to your GitHub repository

2. **Create a netlify.toml file** in the root of your repository:
   ```toml
   [build]
     functions = "functions"
   ```

3. **Create a functions directory** and add a waitlist.js file:
   ```javascript
   // functions/waitlist.js
   const nodemailer = require('nodemailer');

   exports.handler = async (event, context) => {
     // Only allow POST requests
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: 'Method Not Allowed' };
     }

     try {
       const data = JSON.parse(event.body);
       const email = data.email;

       // Validate email
       if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
         return {
           statusCode: 400,
           body: JSON.stringify({ success: false, message: 'Invalid email address' })
         };
       }

       // Set up email transporter (configure with your SMTP details)
       const transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: process.env.SMTP_PORT,
         secure: true,
         auth: {
           user: process.env.SMTP_USER,
           pass: process.env.SMTP_PASS
         }
       });

       // Send email to support
       await transporter.sendMail({
         from: 'noreply@getpawned.io',
         to: 'support@getpawned.io',
         subject: 'New Waitlist Signup',
         text: `A new user has joined the waitlist:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}`
       });

       // Send confirmation email to user
       await transporter.sendMail({
         from: 'support@getpawned.io',
         to: email,
         subject: 'Welcome to the GetPawned Waitlist!',
         text: `Hello,\n\nThank you for joining the GetPawned waitlist! We're excited to have you on board.\n\nYou'll be among the first to know when we launch our revolutionary platform for pawn shop owners.\n\nStay tuned for updates and exclusive early access opportunities.\n\nBest regards,\nThe GetPawned Team`
       });

       return {
         statusCode: 200,
         body: JSON.stringify({
           success: true,
           message: "You're in! You'll be the first to know when we launch. 🚀"
         })
       };
     } catch (error) {
       console.error('Error:', error);
       return {
         statusCode: 500,
         body: JSON.stringify({
           success: false,
           message: 'Server error. Please try again later.'
         })
       };
     }
   };
   ```

4. **Install dependencies**:
   ```bash
   npm init -y
   npm install nodemailer
   ```

5. **Update the form submission code** in index.html:
   ```javascript
   fetch('/.netlify/functions/waitlist', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email: email })
   })
   .then(response => response.json())
   .then(data => {
     if (data.success) {
       formMessage.textContent = data.message;
       formMessage.className = 'form-message success';
       waitlistForm.reset();
     } else {
       formMessage.textContent = data.message || 'Something went wrong. Please try again.';
       formMessage.className = 'form-message error';
     }
   })
   .catch(error => {
     console.error('Error:', error);
     formMessage.textContent = 'Network error. Please try again later.';
     formMessage.className = 'form-message error';
   })
   .finally(() => {
     submitButton.textContent = originalButtonText;
     submitButton.disabled = false;
   });
   ```

6. **Set environment variables** in Netlify:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS

### Option 2: Formspree (Simplest)

1. Create an account at [Formspree](https://formspree.io/)
2. Create a new form and get your form endpoint
3. Update your HTML form:
   ```html
   <form id="waitlist-form" class="waitlist-form" action="https://formspree.io/f/your-form-id" method="POST">
       <input type="email" id="email" name="email" placeholder="Enter your email" required>
       <button type="submit" class="waitlist-button">JOIN WAITLIST</button>
   </form>
   ```

### Option 3: AWS Lambda + API Gateway

Similar to Netlify Functions but using AWS services directly.

## Security Considerations

1. **CORS**: Configure your serverless function to only accept requests from your domain
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Email Validation**: Always validate email addresses server-side
4. **SMTP Security**: Use secure SMTP connections and store credentials as environment variables

## Testing

Before deploying to production, test your implementation thoroughly:
1. Submit valid and invalid email addresses
2. Verify that emails are sent to both support@getpawned.io and the user
3. Test error handling by temporarily disabling your email service

## Monitoring

Set up monitoring for your serverless function to track:
1. Number of submissions
2. Success/failure rates
3. Any errors or exceptions