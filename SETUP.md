# Idea Holiday - Setup Guide

Complete step-by-step guide to set up and run the Idea Holiday travel booking platform.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **MongoDB** 5.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))
- **npm** or **yarn** (comes with Node.js)

## Required Accounts

You'll need to create accounts and get API credentials from:

1. **TBO (Tektravels)** - Travel API for flights and hotels
   - Website: https://www.tboholidays.com/
   - Sign up for a developer account
   - Get your API credentials (Username, Password, Token)

2. **Razorpay** - Payment Gateway
   - Website: https://razorpay.com/
   - Create a business account
   - Get your Key ID and Key Secret from the dashboard

3. **Easebuzz** - Payment Gateway
   - Website: https://easebuzz.in/
   - Sign up for a merchant account
   - Get your Merchant Key and Salt

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/ideaholiday/37.git
cd 37
```

### 2. Install Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Setup MongoDB

#### Option A: Local MongoDB Installation

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # On macOS/Linux
   sudo systemctl start mongod
   
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Windows
   net start MongoDB
   ```

3. Verify MongoDB is running:
   ```bash
   mongo --version
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Whitelist your IP address

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/ideaholiday"
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/ideaholiday

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET="your-random-secret-key-at-least-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# TBO API Configuration
TBO_API_URL="https://api.tektravels.com"
TBO_API_USERNAME="your-tbo-username"
TBO_API_PASSWORD="your-tbo-password"
TBO_API_TOKEN="your-tbo-token"

# Razorpay Configuration
RAZORPAY_KEY_ID="rzp_test_XXXXXXXX"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Easebuzz Configuration
EASEBUZZ_MERCHANT_KEY="your-merchant-key"
EASEBUZZ_SALT="your-salt"
EASEBUZZ_ENV="test"

# Application Settings
NEXT_PUBLIC_APP_NAME="Idea Holiday"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate Secret Key:**
```bash
# On Linux/macOS
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5. Build the Application

```bash
npm run build
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 7. Create Initial Admin User

You can register the first admin user by:

**Option A: Using the API directly:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ideaholiday.com",
    "password": "Admin@123",
    "name": "Admin User",
    "role": "ADMIN"
  }'
```

**Option B: Through the UI:**
1. Go to http://localhost:3000/auth/register
2. Fill in the registration form
3. Select "Customer" initially (for security)
4. After registration, manually update the role in MongoDB:

```bash
# Connect to MongoDB
mongo ideaholiday

# Update user role
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "ADMIN" } }
)
```

## Production Deployment

### Option 1: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel dashboard

### Option 2: Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t ideaholiday .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 \
     --env-file .env \
     ideaholiday
   ```

### Option 3: Traditional Server

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ideaholiday" -- start
   pm2 save
   pm2 startup
   ```

4. Setup Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

5. Install SSL certificate with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Testing the Application

### 1. Test Authentication

- Register a new user at `/auth/register`
- Login at `/auth/login`
- Verify token is stored in localStorage

### 2. Test B2C Features

- Search flights at `/b2c`
- Search hotels at `/b2c/hotels`
- View bookings at `/b2c/bookings`

### 3. Test B2B Features

- Login as Admin/Staff/Agent
- Access dashboard at `/b2b/dashboard`
- View all bookings at `/b2b/bookings`
- Manage users at `/b2b/users` (Admin/Staff only)

### 4. Test Payment Gateways

**Razorpay Test Cards:**
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

**Easebuzz Test Credentials:**
- Use test environment credentials from your dashboard

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
systemctl status mongod

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log

# Test connection
mongo --eval "db.runCommand({ connectionStatus: 1 })"
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### API Connection Issues

- Verify TBO API credentials
- Check if API endpoints are accessible
- Review API request/response in browser DevTools

## Development Tips

### Hot Reload

The development server supports hot module replacement. Changes to files will automatically reload.

### TypeScript Checking

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Database Management

```bash
# Connect to MongoDB
mongo ideaholiday

# View collections
show collections

# View users
db.users.find().pretty()

# View bookings
db.bookings.find().pretty()

# Create index
db.users.createIndex({ email: 1 }, { unique: true })
```

## Support

For issues and questions:

- GitHub Issues: https://github.com/ideaholiday/37/issues
- Email: support@ideaholiday.com
- Documentation: See README.md

## Next Steps

After successful setup:

1. Configure email notifications (optional)
2. Set up SMS gateway (optional)
3. Customize branding and styling
4. Configure payment gateway webhooks
5. Set up monitoring and logging
6. Configure backup strategy
7. Set up staging environment
8. Create CI/CD pipeline

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Use environment-specific configs
- [ ] Enable MongoDB authentication
- [ ] Regular security updates
- [ ] Implement input validation
- [ ] Set up monitoring alerts

## Maintenance

Regular maintenance tasks:

- Update dependencies monthly
- Backup database weekly
- Monitor API usage
- Review error logs
- Update documentation
- Test payment integrations
- Monitor server resources
- Review user feedback

---

**Last Updated:** October 2024
**Version:** 1.0.0
