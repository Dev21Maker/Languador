import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, UserCircle2, Mail } from 'lucide-react';
import { signInWithGoogle, signInAsGuest } from '../lib/auth';
import { LoginButton } from '../components/LoginButton';

export function Login() {
  const [loading, setLoading] = useState<'google' | 'guest' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading('google');
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(null);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading('guest');
    setError(null);
    try {
      await signInAsGuest();
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Languages className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Spanish Learning PvP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Challenge friends and learn Spanish together
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <LoginButton
            onClick={handleGoogleSignIn}
            loading={loading === 'google'}
            disabled={loading === 'guest'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Sign in with Google
          </LoginButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <LoginButton
            onClick={handleGuestSignIn}
            loading={loading === 'guest'}
            disabled={loading === 'google'}
            variant="secondary"
          >
            <UserCircle2 className="w-4 h-4 mr-2" />
            Continue as Guest
          </LoginButton>
        </div>
      </div>
    </div>
  );
}