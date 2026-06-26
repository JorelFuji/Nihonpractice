import { useState } from 'react';
import { authService } from '@/services/authService';
import { analyticsService } from '@/services/analyticsService';
import toast from 'react-hot-toast';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

export default function SignUpForm({ onSuccess, onSwitchToSignIn }: SignUpFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await authService.signUpWithEmail(email, password, displayName);
      analyticsService.logSignUp('email');
      toast.success('Welcome to NihongoQuest! 🎌');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);

    try {
      await authService.signInWithGoogle();
      analyticsService.logSignUp('google');
      toast.success('Welcome to NihongoQuest! 🎌');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="kawaii-card">
        <div className="text-center mb-lg">
          <div className="text-6xl mb-md">🎌</div>
          <h2 className="font-headline-md text-headline-md text-primary mb-xs">
            Start Your Journey
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Create an account to track your progress
          </p>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-md">
          <div>
            <label className="font-label-bold text-on-surface block mb-xs">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-md py-sm bg-surface-container border-2 border-surface-container-highest rounded-lg focus:border-primary focus:outline-none font-body-md"
            />
          </div>

          <div>
            <label className="font-label-bold text-on-surface block mb-xs">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-md py-sm bg-surface-container border-2 border-surface-container-highest rounded-lg focus:border-primary focus:outline-none font-body-md"
            />
          </div>

          <div>
            <label className="font-label-bold text-on-surface block mb-xs">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full px-md py-sm bg-surface-container border-2 border-surface-container-highest rounded-lg focus:border-primary focus:outline-none font-body-md pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="font-label-bold text-on-surface block mb-xs">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-md py-sm bg-surface-container border-2 border-surface-container-highest rounded-lg focus:border-primary focus:outline-none font-body-md"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary py-md rounded-lg font-label-bold tactile-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-lg">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-container-highest"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-on-surface-variant font-body-md">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full bg-white border-2 border-surface-container-highest text-on-surface py-md rounded-lg font-label-bold hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        <div className="text-center mt-lg">
          <span className="font-body-md text-on-surface-variant">
            Already have an account?{' '}
          </span>
          <button
            onClick={onSwitchToSignIn}
            className="font-label-bold text-primary hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
