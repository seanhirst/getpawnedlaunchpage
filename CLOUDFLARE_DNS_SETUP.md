# Cloudflare DNS Configuration for GitHub Pages

## Overview
When using Cloudflare with GitHub Pages, you need to configure your DNS settings differently than with standard DNS providers. Cloudflare acts as a proxy between your visitors and your GitHub Pages site, providing additional security and performance benefits.

## DNS Configuration Steps for getpawned.io

1. **Log in to your Cloudflare dashboard**
2. **Select your domain (getpawned.io)**
3. **Go to the DNS management section**

### For Apex Domain (getpawned.io)

#### Option 1: Using CNAME Flattening (Recommended)
Cloudflare offers a feature called "CNAME Flattening" which allows you to use a CNAME record at the apex domain:

| Type  | Name | Content               | Proxy Status |
|-------|------|------------------------|--------------|
| CNAME | @    | seanhirst.github.io   | Proxied      |

#### Option 2: Using A Records
If you prefer using A records:

| Type | Name | Content        | Proxy Status |
|------|------|----------------|--------------|
| A    | @    | 185.199.108.153 | Proxied      |
| A    | @    | 185.199.109.153 | Proxied      |
| A    | @    | 185.199.110.153 | Proxied      |
| A    | @    | 185.199.111.153 | Proxied      |

### For WWW Subdomain (www.getpawned.io)

| Type  | Name | Content               | Proxy Status |
|-------|------|------------------------|--------------|
| CNAME | www  | seanhirst.github.io   | Proxied      |

## Important Cloudflare Settings

### SSL/TLS Settings
1. Go to the **SSL/TLS** section in your Cloudflare dashboard
2. Set SSL/TLS encryption mode to **Full** or **Full (Strict)**
3. Enable **Always Use HTTPS** option

### Page Rules (Optional)
You may want to create a page rule to redirect www to non-www or vice versa:

For redirecting www to non-www:
- URL pattern: `www.getpawned.io/*`
- Setting: Forwarding URL (301 Permanent Redirect)
- Destination URL: `https://getpawned.io/$1`

### Cache Settings
For a static site like GitHub Pages:
1. Go to the **Caching** section
2. Set appropriate cache settings (Browser Cache TTL: at least 4 hours recommended)

## Verification

After configuring these settings, it may take some time for changes to propagate. You can verify your configuration is working by:

1. Checking that both https://getpawned.io and https://www.getpawned.io are accessible
2. Verifying that HTTPS is working correctly
3. Confirming that any redirects are functioning as expected

## Troubleshooting

If you encounter issues:

1. **DNS Propagation**: Changes may take up to 24 hours to fully propagate
2. **Cloudflare Cache**: Try purging the cache in Cloudflare if you see outdated content
3. **HTTPS Issues**: Make sure your SSL/TLS settings are configured correctly
4. **GitHub Pages Settings**: Ensure your custom domain is properly set in your GitHub repository settings

## Additional Notes

- Cloudflare's proxy (orange cloud icon) should be enabled for all records for maximum security and performance benefits
- Using Cloudflare's proxy means your site will use Cloudflare's SSL certificate rather than the one provided by GitHub Pages
- If you're using a custom domain with GitHub Pages, make sure the CNAME file in your repository contains only your apex domain (getpawned.io)