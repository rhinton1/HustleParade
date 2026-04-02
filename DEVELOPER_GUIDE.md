# HustleParade Frontend - Developer's Guide

## Project Structure

```
src/
├── api/                    # API configuration
│   └── axios.js           # Axios instance with JWT interceptor
├── components/            # Reusable components
│   ├── AuthModal.jsx      # Login/Register modal
│   └── ProtectedRoute.jsx # Route guard for authenticated pages
├── context/               # React Context
│   └── AuthContext.jsx    # Global authentication state
├── hooks/                 # Custom React hooks
│   ├── useAuth.js         # Auth context consumer
│   ├── useForm.js         # Form state management
│   └── useApi.js          # API request hooks
├── pages/                 # Page components
│   ├── HomePage.jsx       # Landing page
│   ├── Dashboard.jsx      # User dashboard
│   ├── Discover.jsx       # Browse content
│   ├── Collaborate.jsx    # Music upload & collaboration
│   ├── Podcast.jsx        # Podcast episodes
│   ├── UserProfile.jsx    # Public user profiles
│   ├── Settings.jsx       # User settings
│   └── components/        # Page-specific components
├── utils/                 # Utility functions
│   └── validation.js      # Form validation rules
├── App.jsx                # Main app & routing
└── main.jsx               # Entry point
```

## Key Patterns

### 1. Authentication with useAuth Hook

```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
    const { user, isAuthenticated, login, logout } = useAuth();
    
    if (!isAuthenticated) {
        return <div>Please log in</div>;
    }
    
    return <div>Welcome {user.username}</div>;
}
```

### 2. Protected Routes

```javascript
<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
```

### 3. API Calls with Authentication

Axios automatically injects JWT token in all requests:

```javascript
import api from '../api/axios';

const response = await api.get('/api/posts/user');
// Authorization header automatically added: Bearer {token}
```

### 4. Form Handling with useForm

```javascript
import { useForm } from '../hooks/useForm';
import { getValidationErrors } from '../utils/validation';

function MyForm() {
    const { values, errors, handleChange, handleSubmit } = useForm(
        { email: '', password: '' },
        async (values) => {
            // Handle form submission
            await api.post('/auth/login', values);
        }
    );

    return (
        <form onSubmit={(e) => handleSubmit(e, (vals) => getValidationErrors(vals))}>
            <input
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
            <button type="submit">Submit</button>
        </form>
    );
}
```

### 5. Data Fetching with useFetch

```javascript
import { useFetch } from '../hooks/useApi';

function MyComponent() {
    const { data, loading, error } = useFetch('/api/posts/user');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            {data.map(post => (
                <div key={post._id} className="bg-gray-800 p-4 rounded mb-4">
                    <p>{post.content}</p>
                    <small className="text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
            ))}
        </div>
    );
}
```

## Common Tasks

### Adding a New Page

1. Create file: `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Link from navigation if needed

```javascript
// src/pages/NewPage.jsx
import React from 'react';

const NewPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-bold">New Page</h1>
                {/* Content */}
            </div>
        </div>
    );
};

export default NewPage;
```

### Adding an API Endpoint Call

1. Make sure backend endpoint exists
2. Import api:
   ```javascript
   import api from '../api/axios';
   ```
3. Make request (token auto-injected):
   ```javascript
   const response = await api.get('/music/user');
   ```

### Form with Validation

```javascript
const { values, errors, handleChange, handleSubmit } = useForm(
    { title: '', description: '' },
    async (values) => {
        await api.post('/music', values);
    }
);

const validationErrors = getValidationErrors(values);
```

### Protected Page Only for Authenticated Users

```javascript
<Route
    path="/private"
    element={
        <ProtectedRoute>
            <PrivatePage />
        </ProtectedRoute>
    }
/>
```

## Styling

The app uses **Tailwind CSS v4** with a dark theme:

- **Primary Background**: `bg-gray-900`
- **Secondary Background**: `bg-gray-800`
- **Primary Accent**: `text-green-400`, `bg-green-500`
- **Danger**: `bg-red-600`
- **Text**: `text-white`
- **Muted Text**: `text-gray-400`, `text-gray-500`

Common utility classes:
```javascript
className="min-h-screen bg-gray-900 text-white py-8"
className="container mx-auto max-w-4xl px-4"
className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
```

## Error Handling

All API calls wrapped in try-catch:

```javascript
try {
    const data = await api.post('/endpoint', payload);
    setSuccess('Success!');
} catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    setError(errorMsg);
}
```

## Loading States

Use conditional rendering:

```javascript
{loading && <div>Loading...</div>}
{error && <div className="text-red-400">{error}</div>}
{!loading && !error && <div>{data}</div>}
```

Or with buttons:

```javascript
<button disabled={isSubmitting}>
    {isSubmitting ? 'Processing...' : 'Submit'}
</button>
```

## Testing

Currently uses Playwright for E2E testing:

```bash
npm run test
```

## Environment Variables

Create `.env` in client folder (optional):
```
VITE_API_BASE_URL=http://localhost:4000/api
```

Backend uses:
```
PORT=4000
MONGO_ATLAS_URI=...
JWT_SECRET=...
CLIENT_ORIGIN=http://localhost:5173
```

## Debugging

### Check if User is Authenticated

```javascript
const { isAuthenticated, user, token } = useAuth();
console.log({ isAuthenticated, user, token });
```

### Check LocalStorage

```javascript
console.log(localStorage.getItem('token'));
```

### Check API Calls

The axios instance logs requests/responses. Check network tab in DevTools.

### Common Issues

| Issue | Solution |
|-------|----------|
| Redirect to "/" instead of showing dashboard | Token invalid - clear localStorage and re-login |
| API returns 401 | JWT_SECRET mismatch between client and server |
| CORS error | Check CLIENT_ORIGIN env var on server |
| Token not persisted | Check localStorage is not disabled |

## Next Steps to Improve

- [ ] Add file upload for music (Multer/S3)
- [ ] WebSocket support for real-time chat (Socket.io)
- [ ] Search/filter functionality
- [ ] Notifications system
- [ ] Delete endpoints for posts/music/chats
- [ ] Edit endpoints for posts/music
- [ ] User follow system
- [ ] Comments/likes on posts
- [ ] Direct messaging UI
- [ ] Group management UI
- [ ] Story creation UI
- [ ] Music collaboration features

## Useful Resources

- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Context API](https://react.dev/reference/react/useContext)

