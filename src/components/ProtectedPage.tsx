import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPageAccessLevel, PageId, AccessLevel } from '../config/pageAccess';

interface ProtectedPageProps {
  pageId: PageId;
  children: ReactNode;
  onShowAuthModal: () => void;
}

export default function ProtectedPage({ pageId, children, onShowAuthModal }: ProtectedPageProps) {
  const { user, isAdmin, loading } = useAuth();
  const accessLevel = getPageAccessLevel(pageId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const hasAccess = checkAccess(accessLevel, user !== null, isAdmin);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="inline-block w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Required</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Create a free account to access this content. Get 7 days free to explore unlimited practice materials and AI-powered feedback.
          </p>
          <button
            onClick={onShowAuthModal}
            className="inline-block px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Create Free Account
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function checkAccess(accessLevel: AccessLevel, isAuthenticated: boolean, isAdmin: boolean): boolean {
  switch (accessLevel) {
    case 'public':
      return true;
    case 'authenticated':
      return isAuthenticated;
    case 'admin':
      return isAdmin;
    case 'trial':
      return isAuthenticated;
    default:
      return false;
  }
}
