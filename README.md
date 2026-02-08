# Short.ly - URL Shortener with Click Tracking

A modern, fast URL shortener with click tracking and analytics. Built with React, Node.js, and SQLite.

## Features

✅ **Fast URL Shortening** - Instantly create short links  
✅ **Click Tracking** - See who clicks your links and where they're from  
✅ **User Accounts** - Sign up, login, manage your links  
✅ **Dashboard** - View all your links and analytics  
✅ **Dark Mode** - Beautiful dark theme support  
✅ **Modern UI** - SaaS-level design with smooth animations  

## Tech Stack

**Backend:**
- Node.js / Express
- SQLite database
- JWT authentication
- Deployed on Render

**Frontend:**
- React 18
- Tailwind CSS
- Framer Motion (animations)
- Deployed on Vercel

## Getting Started

### Backend

```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

### Frontend

```bash
cd client
npm install
npm start
```

App runs on `http://localhost:3000`

## Deployment

### Deploy Frontend (Vercel)

1. Connect your GitHub repo to Vercel
2. Set root directory to `/`
3. Build command: `cd client && npm run build`
4. Output directory: `client/build`
5. Deploy!

### Deploy Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `node server/index.js`
5. Add environment variables
6. Deploy!

## API Endpoints

**Auth:**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

**Links:**
- `POST /api/links/create` - Create short link
- `GET /api/links/list` - Get user's links
- `GET /api/:shortCode` - Redirect to original URL
- `GET /api/links/:shortCode/analytics` - Get analytics

## Environment Variables

```
PORT=5000
JWT_SECRET=your-secret-key
```

## Coming Soon

- Advanced analytics (charts, countries, devices)
- Custom domains
- Link expiration
- Password protection
- AI-powered slug suggestions
- Paid plans & monetization

---

Built with ❤️ by Scott Becoeur
