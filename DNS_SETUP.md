# DNS Configuration for getpawned.io

To properly configure your custom domain for GitHub Pages, you need to set up the following DNS records with your domain registrar:

## For Apex Domain (getpawned.io)

### A Records
Set up the following A records to point your apex domain to GitHub Pages:

| Type | Name | Value |
|------|------|-------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

### AAAA Records (for IPv6 support)
Set up the following AAAA records for IPv6 support:

| Type  | Name | Value |
|-------|------|-------|
| AAAA  | @    | 2606:50c0:8000::153 |
| AAAA  | @    | 2606:50c0:8001::153 |
| AAAA  | @    | 2606:50c0:8002::153 |
| AAAA  | @    | 2606:50c0:8003::153 |

## For www Subdomain (www.getpawned.io)

Set up a CNAME record to point the www subdomain to your GitHub Pages site:

| Type  | Name | Value |
|-------|------|-------|
| CNAME | www  | seanhirst.github.io |

## Verification

After configuring these DNS records, it may take up to 24 hours for the changes to propagate. You can verify the configuration using the `dig` command:

```bash
# Verify A records
dig getpawned.io +noall +answer -t A

# Verify AAAA records
dig getpawned.io +noall +answer -t AAAA

# Verify CNAME record
dig www.getpawned.io +noall +answer -t CNAME
```

## Important Notes

1. DNS changes can take up to 24 hours to propagate.
2. Make sure to enforce HTTPS in your GitHub Pages settings once the DNS is properly configured.
3. Do not use wildcard DNS records (*.getpawned.io) as they can pose security risks.