'use client';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, userName }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-[#161b22] rounded border-2 border-red-800 max-w-md w-full mx-4 transform animate-slideUp">
        {/* Header */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center space-x-2 text-red-400 font-mono text-sm mb-3">
            <span className="text-lg">⚠</span>
            <span>Warning: Destructive Operation</span>
          </div>
          <h2 className="text-base font-bold text-red-400 font-mono mb-2">Delete User</h2>
          <div className="text-xs text-gray-400 font-mono space-y-1">
            <p>This action will permanently delete:</p>
            <p className="text-blue-400 pl-4">User: <span className="text-white">{userName}</span></p>
            <p className="text-yellow-400 pl-4">This action cannot be undone</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#0d1117] text-gray-300 rounded border border-[#30363d] hover:bg-gray-800 transition-all font-mono text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded border border-red-500 hover:bg-red-700 transition-all font-mono text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}