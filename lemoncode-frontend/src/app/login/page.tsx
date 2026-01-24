'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { LoginFormData } from '@/types/user';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await login(data);
      setSuccess('Login successful! Redirecting...');
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError(err.response.data.message);
      } else if (err.response?.status === 422) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
      <div className="bg-[#161b22] p-8 rounded border border-[#30363d] w-full max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded mb-4">
            <span className="text-2xl">🍋</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-400 font-mono mb-1">
            Lemoncode
          </h1>
          <p className="text-gray-500 text-xs font-mono">User Management System</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-400 rounded text-xs font-mono">
            <span className="text-red-500">Error:</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-800 text-green-400 rounded text-xs font-mono">
            <span className="text-green-500">Success:</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-400 font-mono mb-1.5 text-xs">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
              placeholder="admin@lemoncode.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 font-mono">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 font-mono mb-1.5 text-xs">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400 font-mono">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded border border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-3 bg-[#0d1117] rounded border border-[#30363d]">
          <p className="text-xs text-gray-500 mb-2 font-mono">Demo credentials:</p>
          <div className="font-mono text-xs text-gray-400 space-y-1">
            <div><span className="text-blue-400">Email:</span> <span className="text-green-400">admin@lemoncode.com</span></div>
            <div><span className="text-blue-400">Password:</span> <span className="text-green-400">password123</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}