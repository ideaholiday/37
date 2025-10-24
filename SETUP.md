# Setup Guide

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
```

### 3. Start the Application

#### Option A: Run Both Services Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

#### Option B: Using npm scripts from root (if using workspaces)

```bash
# Install all dependencies
npm run install:all

# Start frontend
npm run dev:frontend

# Start backend (in another terminal)
npm run dev:backend
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

### Backend
The backend runs as-is in production. Just ensure your environment variables are set correctly.

## Troubleshooting

### Port Already in Use
If you get an error that port 3000 or 5000 is already in use:

**Frontend:**
```bash
PORT=3001 npm run dev
```

**Backend:**
```bash
PORT=5001 npm run dev
```

### Module Not Found
Make sure you've installed all dependencies:
```bash
npm install
```

### CORS Issues
The frontend is configured to proxy API requests to the backend. Make sure both servers are running.

## Development Workflow

1. Make changes to the code
2. The development server will automatically reload
3. Test your changes in the browser
4. Commit your changes

## Next Steps

- Integrate with real flight APIs (TBO, Amadeus, Sabre)
- Integrate with hotel booking APIs (Expedia, Booking.com)
- Set up a database (MongoDB, PostgreSQL)
- Implement authentication
- Add payment gateway integration
- Deploy to production

## Support

For issues or questions, please refer to the README.md file or contact support@travelbooking.com
