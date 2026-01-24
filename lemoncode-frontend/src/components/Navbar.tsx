'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-[#161b22] border-b border-[#30363d] backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-6">
            <Link href="/users" className="flex items-center space-x-2 group">
              <span className="text-green-400 text-lg group-hover:text-green-300 transition-colors font-mono">🍋</span>
              <span className="text-base font-bold text-blue-400 font-mono tracking-tight">
                Lemoncode
              </span>
            </Link>
            <div className="flex space-x-1">
              <Link
                href="/users"
                className="text-gray-400 hover:text-gray-200 hover:bg-gray-800 px-3 py-1.5 rounded border border-transparent hover:border-gray-700 transition-all font-mono text-sm"
              >
                Users
              </Link>
              <Link
                href="/users/create"
                className="text-gray-400 hover:text-gray-200 hover:bg-gray-800 px-3 py-1.5 rounded border border-transparent hover:border-gray-700 transition-all font-mono text-sm"
              >
                Create User
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-xs text-gray-500 bg-gray-900 px-3 py-1.5 rounded border border-gray-800 font-mono">
              <span className="text-blue-400">{user?.firstname}</span>
            </div>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 hover:bg-gray-800 px-3 py-1.5 rounded border border-transparent hover:border-red-900 transition-all font-mono text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}