'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import DeleteModal from '@/components/DeleteModal';
import api from '@/lib/api';
import { User, UsersResponse } from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null,
  });

  const fetchUsers = async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const response = await api.get<UsersResponse>('/users', {
        params: { page, per_page: perPage, search: searchQuery },
      });
      setUsers(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, search);
  }, [currentPage, perPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, search);
  };

  const handleDelete = async () => {
    if (!deleteModal.user) return;

    try {
      await api.delete(`/users/${deleteModal.user.id}`);
      setDeleteModal({ isOpen: false, user: null });
      fetchUsers(currentPage, search);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-6">
        <div className="bg-[#161b22] rounded border border-[#30363d] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#30363d] bg-[#0d1117]">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold text-blue-400 font-mono">Users Management</h1>
                <p className="text-xs text-gray-500 mt-1 font-mono">Manage system users</p>
              </div>
              <Link
                href="/users/create"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded border border-green-500 transition-all font-mono text-sm flex items-center space-x-1"
              >
                <span>+</span>
                <span>Create User</span>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 py-4 bg-[#0d1117] border-b border-[#30363d]">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="flex-1 px-3 py-2 bg-[#161b22] border border-[#30363d] rounded text-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder-gray-600"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded border border-blue-500 transition-all font-mono text-sm"
              >
                Search
              </button>
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setCurrentPage(1);
                    fetchUsers(1, '');
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded border border-gray-600 transition-all font-mono text-sm"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-blue-500"></div>
              </div>
              <p className="mt-4 text-gray-500 font-mono text-xs">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-sm">
                  <thead>
                    <tr className="bg-[#0d1117] border-b border-[#30363d]">
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d]">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-[#0d1117] transition-colors">
                        <td className="px-4 py-3 text-gray-500 text-xs">{user.id}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-blue-400">
                            {user.firstname} {user.lastname}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{user.email}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{user.phone || '-'}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 rounded text-xs font-mono ${
                              user.status === 'active'
                                ? 'bg-green-900/30 text-green-400 border border-green-800'
                                : 'bg-red-900/30 text-red-400 border border-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link
                              href={`/users/${user.id}/edit`}
                              className="bg-amber-900/30 text-amber-400 border border-amber-800 px-2 py-1 rounded hover:bg-amber-900/50 transition-all text-xs"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteModal({ isOpen: true, user })}
                              className="bg-red-900/30 text-red-400 border border-red-800 px-2 py-1 rounded hover:bg-red-900/50 transition-all text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between">
                <div className="text-xs text-gray-500 font-mono">
                  Showing <span className="text-blue-400">{users.length > 0 ? (currentPage - 1) * perPage + 1 : 0}</span> to{' '}
                  <span className="text-blue-400">{Math.min(currentPage * perPage, total)}</span> of{' '}
                  <span className="text-blue-400">{total}</span> users
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] text-gray-400 rounded hover:bg-[#0d1117] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono text-xs"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1.5 bg-blue-600 text-white rounded font-mono text-xs border border-blue-500">
                    {currentPage}/{totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] text-gray-400 rounded hover:bg-[#0d1117] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono text-xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleDelete}
        userName={deleteModal.user ? `${deleteModal.user.firstname} ${deleteModal.user.lastname}` : ''}
      />
    </ProtectedRoute>
  );
}