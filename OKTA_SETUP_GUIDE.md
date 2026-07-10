# 🔒 Okta Integration Guide for React Frontend

This guide describes how to integrate Okta authentication into your React Vite application.

---

## 📦 Step 1: Install Dependencies
Run the following npm command inside `nihon-quest-fullstack/frontend` directory:
```bash
npm install @okta/okta-react @okta/okta-auth-js react-router-dom
```

---

## ⚙️ Step 2: Configure Environment Variables
Ensure your local `nihon-quest-fullstack/frontend/.env` file contains the following keys (or run `./setup-okta-admin.sh` to generate them):
```env
VITE_OKTA_CLIENT_ID="<Your_Okta_Client_ID>"
VITE_OKTA_ISSUER="https://<your-okta-org>.okta.com/oauth2/default"
VITE_OKTA_REDIRECT_URI="http://localhost:5173/login/callback"
```

---

## 💻 Step 3: Implement Okta Security Provider in React

Below is an example of wrapping your React app router with `Security` provider in `App.tsx`:

```typescript
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OKTA_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
});

export default function App() {
  const navigate = useNavigate();
  
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        {/* Okta login callback route */}
        <Route path="/login/callback" element={<LoginCallback />} />
        
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Example Protected Route (Needs authentication) */}
        {/* Wrap your component or enforce validation using useOktaAuth() hook */}
      </Routes>
    </Security>
  );
}
```

---

## 🎯 Step 4: Access User Claims & Login Hook
Use the `useOktaAuth` hook in any child components of `Security` to access login state and user information:

```typescript
import { useOktaAuth } from '@okta/okta-react';

export default function ProfileHeader() {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading Auth State...</div>;
  }

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  return (
    <div>
      {authState.isAuthenticated ? (
        <div>
          <p>Welcome back, {authState.idToken?.claims.name}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={login}>Sign In with Okta</button>
      )}
    </div>
  );
}
```
