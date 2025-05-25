# Troubleshooting Email Delivery for support@getpawned.io

If you've set up support@getpawned.io as an alias in Google Workspace but aren't receiving emails, here are several things to check:

## 1. Verify Alias Configuration in Google Workspace

1. **Log in to Google Workspace Admin Console**:
   - Go to [admin.google.com](https://admin.google.com)
   - Sign in with your admin credentials

2. **Check User Alias Settings**:
   - Go to Directory > Users
   - Find and click on your user account
   - Click on "User information" section
   - Verify that support@getpawned.io is listed under "Email aliases"
   - If not, add it by clicking "Add an alias" and entering support@getpawned.io

3. **Check Group Settings** (if you're using a group instead of an alias):
   - Go to Directory > Groups
   - Check if support@getpawned.io is set up as a group
   - Verify that your email is a member of this group
   - Check the group's settings to ensure it's configured to forward messages to members

## 2. Verify Domain MX Records

1. **Check MX Records**:
   - Use a tool like [MX Toolbox](https://mxtoolbox.com/) to check your domain's MX records
   - Enter getpawned.io and click "MX Lookup"
   - Verify that the MX records point to Google's mail servers:
     ```
     PRIORITY  HOST
     1         ASPMX.L.GOOGLE.COM
     5         ALT1.ASPMX.L.GOOGLE.COM
     5         ALT2.ASPMX.L.GOOGLE.COM
     10        ALT3.ASPMX.L.GOOGLE.COM
     10        ALT4.ASPMX.L.GOOGLE.COM
     ```

2. **Check DNS Propagation**:
   - DNS changes can take up to 48 hours to fully propagate
   - If you recently set up the domain or changed MX records, wait for propagation to complete

## 3. Check Email Routing Settings

1. **Verify Email Routing in Google Workspace**:
   - In Admin Console, go to Apps > Google Workspace > Gmail > Routing
   - Check if there are any routing rules that might affect emails to support@getpawned.io
   - Ensure there are no conflicting rules that might redirect or filter these emails

## 4. Check Spam and Filters

1. **Check Spam Folder**:
   - Look in your Gmail spam folder for the missing emails
   - If found, mark them as "Not spam"

2. **Check Gmail Filters**:
   - In Gmail, click the gear icon > See all settings
   - Go to the "Filters and Blocked Addresses" tab
   - Check if any filters might be affecting emails sent to support@getpawned.io

## 5. Test Email Delivery

1. **Send a Test Email**:
   - Send a test email to support@getpawned.io from an external email account
   - Check if it arrives in your inbox
   - Check the email headers of received emails to understand the delivery path

2. **Check Email Logs in Google Workspace**:
   - In Admin Console, go to Reports > Audit > Email log search
   - Search for emails sent to support@getpawned.io
   - This will show if Google received the emails and what happened to them

## 6. Verify SPF, DKIM, and DMARC Records

1. **Check SPF Record**:
   - Use [MX Toolbox](https://mxtoolbox.com/) to check your SPF record
   - Enter "getpawned.io" and select "SPF Record Lookup"
   - Ensure it includes Google's mail servers: `include:_spf.google.com`

2. **Check DKIM Configuration**:
   - In Admin Console, go to Apps > Google Workspace > Gmail > Authenticate email
   - Verify DKIM is set up correctly for your domain

3. **Check DMARC Record**:
   - Use [MX Toolbox](https://mxtoolbox.com/) to check your DMARC record
   - Enter "getpawned.io" and select "DMARC Lookup"
   - Ensure it's properly configured

## 7. Contact Google Workspace Support

If you've checked all the above and still have issues:

1. **Contact Google Workspace Support**:
   - In Admin Console, click the question mark icon in the top right
   - Select "Contact support"
   - Explain the issue with your email alias

## 8. Alternative Solutions

If you continue to have issues with the alias:

1. **Create a Forwarding Rule**:
   - Instead of an alias, create a separate user account for support@getpawned.io
   - Set up email forwarding to your main account
   - This gives you more control over the inbox

2. **Use Google Groups**:
   - Create a Google Group with the address support@getpawned.io
   - Add your email as a member
   - Configure the group to forward all messages to members

3. **Check Cloudflare Email Routing** (if using Cloudflare):
   - If you're using Cloudflare for DNS, check if Email Routing is enabled
   - This could interfere with your Google Workspace email delivery