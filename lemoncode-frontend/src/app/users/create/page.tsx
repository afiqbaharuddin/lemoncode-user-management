'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import api from '@/lib/api';
import { UserFormData } from '@/types/user';

export default function CreateUserPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues: {
      status: 'active',
    }
  });

  const onSubmit = async (data: UserFormData) => {
    setError('');
    setLoading(true);

    try {
      await api.post('/users', data);
      router.push('/users');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages.join(', '));
      } else {
        setError('An error occurred while creating the user');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-2xl mx-auto bg-[#161b22] rounded border border-[#30363d]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-blue-400 font-mono">Create New User</h1>
                <p className="text-xs text-gray-500 mt-1 font-mono">Add new user to the system</p>
              </div>
              <Link
                href="/users"
                className="text-blue-400 hover:text-blue-300 transition-colors font-mono flex items-center space-x-1 text-sm"
              >
                <span>←</span>
                <span>Back</span>
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-400 rounded text-xs font-mono">
                <span className="text-red-500">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-mono mb-1.5 text-xs">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('firstname', { required: 'First name is required' })}
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
                    placeholder="John"
                  />
                  {errors.firstname && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.firstname.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1.5 text-xs">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('lastname', { required: 'Last name is required' })}
                    className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
                    placeholder="Doe"
                  />
                  {errors.lastname && (
                    <p className="mt-1 text-xs text-red-400 font-mono">{errors.lastname.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-mono mb-1.5 text-xs">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400 font-mono">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 font-mono mb-1.5 text-xs">Phone</label>
                <input
                  type="text"
                  {...register('phone')}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
                  placeholder="+60123456789"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-mono mb-1.5 text-xs">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
                  placeholder="Min 8 characters"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400 font-mono">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-400 font-mono mb-1.5 text-xs">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-400 font-mono">{errors.status.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded border border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
                <Link
                  href="/users"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2.5 rounded border border-gray-600 transition-all text-center font-mono text-sm"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}