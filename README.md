# CareerX Virtual Career Fair Platform

Frontend-only demo of a virtual career fair platform with role-based portals for admins, companies, and students. Features mock data and offline functionality.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- State Management: React Context
- UI: Tailwind CSS with custom gradients
- Mock Data: Local state with simulated API responses

## Features
- **Admin Portal**: Create events, approve companies, view analytics and registrations
- **Company Portal**: Create booths, post job roles, chat with students, manage applications
- **Student Portal**: Browse events, enter booths, apply with resumes, live chat
- **Offline Mode**: Full functionality without backend dependencies
- **Quick Access**: Bypass authentication for immediate exploration

## Key Components
- Authentication bypass for demo purposes
- Mock data for events, booths, companies, and applications
- Simulated real-time chat functionality
- Responsive design with modern UI patterns
- Toast notifications and user feedback

## Quick Start
```bash
# Install dependencies
cd client
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

## Usage
1. **Quick Access**: Click "Quick Access" on the auth page for instant admin access
2. **Demo Login**: Use the form to login as different user types
3. **Explore Features**: Create events, booths, apply to jobs, and chat in real-time
4. **All Data is Mock**: Changes persist in browser session but reset on refresh

## Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture Notes
- No backend required - all functionality is client-side
- Authentication is simulated with localStorage
- API calls are mocked with setTimeout delays
- Real-time features use intervals instead of WebSockets
- Data persists only for the current session
### Frontend
```bash
cd client
npm run build
npm run preview
```

### Backend
```bash
cd server
npm install --omit=dev
npm start
```

## Environment Variables
### server/.env
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/careerx
JWT_SECRET=replace_with_strong_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### client/.env
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## API Endpoints (Core)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/events
- POST /api/events (admin)
- POST /api/booths (company)
- GET /api/booths/:eventId
- POST /api/apply (student, multipart with resume)
- GET /api/applications/:companyId
- GET /api/messages/:boothId

## Notes
- Resume upload endpoint requires Cloudinary credentials.
- Without Cloudinary config, chat/events/auth/booths still work, while apply upload returns a clear 503 message.
