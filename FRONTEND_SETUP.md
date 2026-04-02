# HustleParade Frontend - Setup & Development Guide

## What's New

The frontend has been significantly improved with the following additions:

### 🔐 Authentication System
- **AuthContext** (`src/context/AuthContext.jsx`) - Global auth state management
- **useAuth Hook** (`src/hooks/useAuth.js`) - Easy access to auth state
- **ProtectedRoute** (`src/components/ProtectedRoute.jsx`) - Guard authenticated pages
- **AuthModal** (`src/components/AuthModal.jsx`) - Unified login/register modal

### 📄 New Pages
- **Dashboard** (`src/pages/Dashboard.jsx`) - Authenticated user dashboard with posts & music
- **Discover** (`src/pages/Discover.jsx`) - Browse community content
- **Collaborate** (`src/pages/Collaborate.jsx`) - Upload music & find collaborators
- **Podcast** (`src/pages/Podcast.jsx`) - Podcast episodes

### 🛣️ Routing
- `/` - Home page
- `/discover` - Discover content
- `/collaborate` - Collaboration hub
- `/podcast` - Podcast episodes
- `/dashboard` - User dashboard (protected)

### 🔧 How It Works

#### Authentication Flow
1. User clicks "Login" → AuthModal opens
2. User can toggle between Login and Register
3. On submit, API call to `/api/auth/login` or `/api/auth/register`
4. Token stored in localStorage + AuthContext state updated
5. JWT automatically injected in all API requests via axios interceptor

#### Protected Routes
- Any unauthenticated request to `/dashboard` redirects to `/`
- Protected routes show loading spinner while checking auth

#### Dashboard
- Shows user's posts and music
- Create new posts
- View existing posts & music with metadata
- Real-time sync with backend

## Installation & Running

### Prerequisites
- Node.js 18+
- MongoDB running (local or Atlas)

### Setup

1. **Install dependencies**
```bash
cd iac/client
npm install

cd ../server
npm install
```

2. **Configure environment variables**

Create `.env` in `iac/server/`:
```
PORT=4000
MONGO_ATLAS_URI=mongodb+srv://user:pass@cluster.mongodb.net/hustleparade
JWT_SECRET=your_super_secret_key_change_this_in_production
CLIENT_ORIGIN=http://localhost:5173
```

Create `.env` in `iac/client/` (optional, already configured):
```
# Client uses localhost:4000 by default
```

3. **Start the server**
```bash
cd iac/server
npm run dev
```

4. **Start the client** (in another terminal)
```bash
cd iac/client
npm run start
```

The app will open at `http://localhost:5173`

## Testing the Auth Flow

### Register
1. Click "Login" on the home page
2. Click "Sign Up" in the modal
3. Enter username, email, password
4. Click "Sign Up"
5. Redirected to dashboard if successful

### Login
1. Click "Login"
2. Enter email/username and password
3. Click "Login"
4. Redirected to dashboard

### Logout
1. Click your username in the header
2. Click "Logout"
3. Redirected to home page

## Key Features Implemented

✅ Global auth state with JWT token management
✅ Protected routes that require authentication
✅ Login/Register in a single modal (toggle mode)
✅ Automatic token injection in API requests
✅ User dashboard with posts & music display
✅ Create posts from dashboard
✅ Error handling & validation
✅ Loading states
✅ Responsive design
✅ Nav links now route to actual pages

## Known Limitations & Next Steps

⚠️ **Still TODO:**
- [ ] File upload for music (currently expects URLs)
- [ ] Real-time messaging with WebSockets
- [ ] User profiles & public profiles
- [ ] Search/filter for discovering content
- [ ] Notifications system
- [ ] Group creation & management UI
- [ ] Story creation UI
- [ ] Delete endpoints for posts/music
- [ ] Input validation on music upload form
- [ ] Loading states on buttons

## Architecture Notes

### AuthContext
- Stores: `user`, `token`, `loading`, `error`, `isAuthenticated`
- Methods: `login()`, `register()`, `logout()`
- Persists token in localStorage on login
- Validates token on app load via `/api/auth/me`

### API Interceptor
```javascript
// Automatically adds: Authorization: Bearer {token}
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

### Protected Route
```javascript
// Redirects to "/" if not authenticated
<ProtectedRoute>
    <Dashboard />
</ProtectedRoute>
```

## Troubleshooting

### "Token invalid or expired" error
- Clear localStorage and log in again
- Check that JWT_SECRET in server matches

### "Connection refused" on API calls
- Ensure server is running on port 4000
- Check CLIENT_ORIGIN in server .env

### Routes not working
- Make sure you're using the new App.jsx with Router at top level
- AuthProvider must wrap all routes

## Questions?
Check the component implementations for detailed examples of:
- Using `useAuth()` hook
- Making authenticated API calls
- Handling errors & loading states
- Protected route patterns

