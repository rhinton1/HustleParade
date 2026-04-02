# 🚀 Quick Start Checklist

## Prerequisites ✅
- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas account (or local MongoDB)
- [ ] Code editor (VS Code recommended)
- [ ] Git (optional but recommended)

## Initial Setup

### 1. Clone/Download Project
```bash
cd H:\Renaldo\Apps\Projects\HustleParade
```

### 2. Install Dependencies
```bash
# Install server dependencies
cd iac/server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

**Server: `iac/server/.env`**
```
PORT=4000
MONGO_ATLAS_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.mongodb.net/hustleparade
JWT_SECRET=your_super_secret_key_change_in_production_12345
CLIENT_ORIGIN=http://localhost:5173
```

**Client: Already configured (optional override in `iac/client/.env`)**
```
VITE_API_BASE_URL=http://localhost:4000/api
```

### 4. Start the Application

**Terminal 1 - Server:**
```bash
cd iac/server
npm run dev
# Should see: "Server listening on port 4000"
# And: "Connected to MongoDB successfully!"
```

**Terminal 2 - Client:**
```bash
cd iac/client
npm run start
# Should automatically open http://localhost:5173
```

## First-Time Testing

### Create an Account
1. Click "Login" button in header
2. Click "Sign Up"
3. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click "Sign Up"
5. You should see the Dashboard!

### Post Something
1. In Dashboard, type in the text area: "Hello HustleParade!"
2. Click "Post"
3. Your post appears below

### Logout & Login Again
1. Click ⚙️ username in header
2. Click "Logout"
3. Click "Login"
4. Enter email and password from above
5. You should be back in Dashboard

### Visit Your Profile
1. In header, click your username (⚙️)
2. You're in Settings page
3. Go back to Dashboard
4. (Note: Public profile page at `/user/testuser` shows public content only)

## Project Structure Quick Reference

```
HustleParade/
├── FRONTEND_SETUP.md              ← Read this for detailed frontend setup
├── FRONTEND_IMPROVEMENTS.md       ← What's been done (this file)
├── DEVELOPER_GUIDE.md             ← Coding patterns & best practices
├── iac/
│   ├── client/                    ← React Frontend
│   │   ├── src/
│   │   │   ├── api/              # Axios config
│   │   │   ├── context/          # Auth context
│   │   │   ├── hooks/            # Custom hooks
│   │   │   ├── components/       # Reusable components
│   │   │   ├── pages/            # Full pages
│   │   │   ├── utils/            # Helper functions
│   │   │   └── App.jsx           # Router setup
│   │   └── package.json
│   └── server/                    ← Express Backend
│       ├── controllers/           # Route handlers
│       ├── models/               # Database schemas
│       ├── routes/               # API routes
│       ├── middleware/           # Auth middleware
│       ├── config/               # Database config
│       ├── app.js               # Express setup
│       ├── server.js            # Server entry
│       └── package.json
```

## Common Commands

```bash
# Start development
npm run dev          # In server folder
npm run start        # In client folder

# Build for production
npm run build        # In client folder

# Run tests
npm run test         # In client folder (Playwright)
npm test             # In server folder (Jest)

# Lint code
npm run lint         # In client folder
```

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGO_ATLAS_URI is correct
- Check your IP is whitelisted in MongoDB Atlas
- Try a new connection string

### "CORS error" or "401 Unauthorized"
- Make sure server is running on port 4000
- Check CLIENT_ORIGIN in server .env matches client URL
- Check JWT_SECRET is the same on both (it is by default)

### "Token invalid or expired"
- Clear browser localStorage: Open DevTools → Application → Clear Storage
- Log in again

### Login modal not closing after signup
- Check browser console for errors
- Check network tab to see API response
- Make sure server is running

### API calls failing
- Check server is running: `http://localhost:4000` should work
- Check response in Network tab of DevTools
- Make sure you're authenticated for protected endpoints

## Next Steps

### Short Term
1. Upload a music track (need to provide valid URLs currently)
2. Visit different pages (Discover, Collaborate, Podcast)
3. Test logout and login again

### Medium Term
1. Implement file uploads for music
2. Add public feed functionality
3. Test with multiple users

### Long Term
1. Deploy to production (Vercel for client, Render/Railway for server)
2. Implement real-time chat with WebSockets
3. Add advanced features (groups, notifications, etc.)

## Tips & Tricks

### Enable DevTools
- Client: F12 or Right-click → Inspect
- Check Console tab for errors
- Check Network tab to see API calls

### Check Auth State
Open DevTools Console:
```javascript
// Check token in storage
localStorage.getItem('token')

// Check user in context (requires custom hook)
// In component: const { user } = useAuth();
```

### Test Different Scenarios
1. **Logged out user**: Try visiting `/dashboard`, should redirect to `/`
2. **Logged in user**: Visit any page, should show username in header
3. **Public profile**: Visit `/user/testuser`, should show public posts only

## Resources

- 📖 [React Documentation](https://react.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🛣️ [React Router](https://reactrouter.com)
- 📡 [Axios](https://axios-http.com)
- 🗄️ [MongoDB](https://docs.mongodb.com)
- 💻 [Express](https://expressjs.com)

## Getting Help

1. Check the error message in console
2. Look at `DEVELOPER_GUIDE.md` for code examples
3. Check `FRONTEND_SETUP.md` for installation issues
4. Review the code comments in relevant files
5. Check the server/client logs in terminal

---

**Ready to go!** 🎉

If you see your dashboard after signup, everything is working correctly.

Happy coding! 🚀

