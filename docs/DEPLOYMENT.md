# Deployment Guide - Idea Holiday

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Laravel 12 backend API running
- Database setup (PostgreSQL/MySQL)
- Razorpay account for payments

## Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ideaholiday/37.git
   cd 37
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env.local` file:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
   NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com

   # Feature Flags
   NEXT_PUBLIC_ENABLE_B2B=true
   NEXT_PUBLIC_ENABLE_B2C=true
   NEXT_PUBLIC_MOCK_MODE=false

   # Pricing Configuration
   NEXT_PUBLIC_DEFAULT_MARKUP_PERCENT=5
   NEXT_PUBLIC_PG_FEE_PERCENT=2
   NEXT_PUBLIC_CURRENCY=INR

   # Razorpay
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=your_secret_key

   # CMS (Optional)
   NEXT_PUBLIC_CMS_ENDPOINT=https://cms.yourdomain.com
   CMS_API_KEY=your_cms_api_key

   # Monitoring
   SENTRY_DSN=your_sentry_dsn
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## Build & Deploy

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure environment variables in Vercel dashboard**

5. **Set custom domain**
   ```bash
   vercel domains add yourdomain.com
   ```

### Option 2: Self-Hosted (PM2 + Nginx)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Create PM2 ecosystem file** (`ecosystem.config.js`)
   ```javascript
   module.exports = {
     apps: [{
       name: 'idea-holiday',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
       }
     }]
   }
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   COPY --from=builder /app/next.config.js ./
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build Docker image**
   ```bash
   docker build -t idea-holiday .
   ```

3. **Run container**
   ```bash
   docker run -p 3000:3000 --env-file .env.local idea-holiday
   ```

## Post-Deployment Checklist

- [ ] Verify API connection
- [ ] Test payment gateway integration
- [ ] Configure CDN for static assets
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics)
- [ ] Test email/SMS notifications
- [ ] Verify SSL certificate
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Test all booking flows
- [ ] Verify B2B portal access
- [ ] Test mobile responsiveness
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Test webhook handlers

## Monitoring & Maintenance

### Health Checks

Create a health check endpoint:
```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
}
```

### Logging

Use structured logging:
```typescript
console.log(JSON.stringify({
  level: 'info',
  message: 'Booking created',
  bookingId: 'IH12345',
  timestamp: new Date().toISOString(),
}))
```

### Performance Monitoring

- Monitor Core Web Vitals
- Track API response times
- Monitor conversion rates
- Track error rates

## Troubleshooting

### Common Issues

1. **Build fails with memory error**
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

2. **API connection timeout**
   - Check NEXT_PUBLIC_API_BASE_URL
   - Verify CORS settings on backend
   - Check firewall rules

3. **Payment gateway errors**
   - Verify Razorpay credentials
   - Check webhook endpoint configuration
   - Ensure SSL is enabled

4. **Slow page loads**
   - Enable CDN
   - Optimize images
   - Enable static generation where possible

## Support

For deployment issues:
- Email: support@ideaholiday.com
- Phone: +91-XXX-XXX-XXXX
- Documentation: https://docs.ideaholiday.com
