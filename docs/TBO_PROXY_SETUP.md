# TBO API Proxy Configuration Guide

## Overview
This guide explains how to configure a SOCKS5 proxy for TBO API calls to bypass IP restrictions and use your droplet's IP address.

## Why Use a Proxy?

TBO API may have IP-based restrictions or you may want to route all API calls through a specific server (like a DigitalOcean droplet) to:
- Maintain consistent IP for TBO authentication
- Bypass local network restrictions
- Route through a whitelisted IP address
- Ensure reliable connectivity

## Configuration

### 1. Environment Variable

Add the following to your `.env` file:

```bash
# Optional: Proxy for TBO API calls (to bypass IP restrictions and use droplet IP)
TBO_PROXY=socks5h://127.0.0.1:1080
```

**Proxy URL Format:**
- `socks5h://` - SOCKS5 proxy with DNS resolution on proxy side
- `127.0.0.1:1080` - Proxy server address and port

### 2. Setting Up SSH SOCKS5 Proxy

If you have a DigitalOcean droplet or remote server:

```bash
# Create SSH tunnel with SOCKS5 proxy
ssh -D 1080 -N -f user@your-droplet-ip

# Explanation:
# -D 1080: Create SOCKS5 proxy on local port 1080
# -N: Don't execute remote command
# -f: Go to background after authentication
# user@your-droplet-ip: Your droplet credentials
```

### 3. Persistent SSH Tunnel

To keep the tunnel running, create a systemd service or use `autossh`:

**Using autossh (recommended):**

```bash
# Install autossh
brew install autossh  # macOS
sudo apt install autossh  # Ubuntu

# Create persistent tunnel
autossh -M 0 -D 1080 -N -f user@your-droplet-ip
```

**Create a launch script** (`~/scripts/tbo-proxy.sh`):

```bash
#!/bin/bash
# TBO Proxy SSH Tunnel Script

DROPLET_USER="your-username"
DROPLET_IP="157.245.100.148"
LOCAL_PORT="1080"

# Kill existing tunnel
pkill -f "ssh -D ${LOCAL_PORT}"

# Start new tunnel
autossh -M 0 -D ${LOCAL_PORT} -N -f \
  -o "ServerAliveInterval=60" \
  -o "ServerAliveCountMax=3" \
  -o "ExitOnForwardFailure=yes" \
  ${DROPLET_USER}@${DROPLET_IP}

echo "TBO Proxy tunnel started on localhost:${LOCAL_PORT}"
```

Make it executable:

```bash
chmod +x ~/scripts/tbo-proxy.sh
```

### 4. Verify Proxy is Working

```bash
# Check if tunnel is active
ps aux | grep "ssh -D 1080"

# Test proxy connection
curl --socks5-hostname 127.0.0.1:1080 https://api.ipify.org?format=json

# This should return your droplet's IP, not your local IP
```

## Implementation Details

The TBO service (`/lib/api/tbo.ts`) automatically uses the proxy if `TBO_PROXY` is configured:

```typescript
// Get axios config with proxy if configured
private getAxiosConfig() {
  const config: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  };

  // Add proxy if configured (for bypassing IP restrictions)
  if (TBO_PROXY) {
    try {
      const proxyAgent = new SocksProxyAgent(TBO_PROXY);
      config.httpAgent = proxyAgent;
      config.httpsAgent = proxyAgent;
      console.log('Using TBO proxy:', TBO_PROXY);
    } catch (error) {
      console.warn('Failed to configure proxy, proceeding without it:', error);
    }
  }

  return config;
}
```

All TBO API calls will automatically route through the proxy when configured.

## Alternative Proxy Options

### 1. HTTP Proxy

```bash
# In .env
TBO_PROXY=http://proxy-server:8080
```

### 2. SOCKS5 with Authentication

```bash
# In .env
TBO_PROXY=socks5h://username:password@proxy-server:1080
```

### 3. Direct Droplet Configuration

If your application runs on the droplet, you don't need a proxy:

```bash
# Simply remove or comment out the TBO_PROXY variable
# TBO_PROXY=socks5h://127.0.0.1:1080
```

## Troubleshooting

### Proxy Connection Failed

```bash
# Check if SSH tunnel is running
ps aux | grep "ssh -D"

# Restart tunnel
pkill -f "ssh -D 1080"
ssh -D 1080 -N -f user@your-droplet-ip
```

### Authentication Issues

```bash
# Test SSH connection first
ssh user@your-droplet-ip

# Use SSH key for passwordless authentication
ssh-copy-id user@your-droplet-ip
```

### DNS Resolution Issues

Use `socks5h://` instead of `socks5://` to ensure DNS resolution happens on the proxy side.

### Verify Proxy is Being Used

Check application logs - you should see:
```
Using TBO proxy: socks5h://127.0.0.1:1080
```

## Security Best Practices

1. **Use SSH Keys**: Don't use password authentication
2. **Firewall Rules**: Only allow necessary ports on droplet
3. **Monitor Access**: Check droplet logs regularly
4. **Rotate Keys**: Change SSH keys periodically
5. **Use VPN**: Consider using a VPN for added security

## Performance Considerations

- **Latency**: Proxy adds slight latency to API calls
- **Bandwidth**: Ensure droplet has sufficient bandwidth
- **Reliability**: Use autossh for automatic reconnection
- **Monitoring**: Monitor tunnel health and droplet resources

## macOS LaunchAgent (Auto-start on Boot)

Create `~/Library/LaunchAgents/com.ideaholiday.tboproxy.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ideaholiday.tboproxy</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/YOUR_USERNAME/scripts/tbo-proxy.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Load the agent:

```bash
launchctl load ~/Library/LaunchAgents/com.ideaholiday.tboproxy.plist
```

## Testing

### Test Without Proxy

```bash
# Comment out in .env
# TBO_PROXY=socks5h://127.0.0.1:1080

# Restart dev server
npm run dev

# Check logs - should not see "Using TBO proxy"
```

### Test With Proxy

```bash
# Uncomment in .env
TBO_PROXY=socks5h://127.0.0.1:1080

# Restart dev server
npm run dev

# Check logs - should see "Using TBO proxy: socks5h://127.0.0.1:1080"
```

## Support

For issues:
- Check SSH tunnel is active: `ps aux | grep "ssh -D"`
- Verify droplet is accessible: `ping your-droplet-ip`
- Check firewall rules on droplet
- Review application logs for proxy errors

---

**Last Updated:** October 24, 2025
**Status:** Production Ready
