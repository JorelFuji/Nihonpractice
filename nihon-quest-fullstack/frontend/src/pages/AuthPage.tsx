import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-container-margin py-lg bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5">
      <div className="w-full max-w-md">
        {isSignIn ? (
          <SignInForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignUp={() => setIsSignIn(false)}
          />
        ) : (
          <SignUpForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignIn={() => setIsSignIn(true)}
          />
        )}
      </div>
    </div>
  );
}
