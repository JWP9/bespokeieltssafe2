import { Award } from 'lucide-react';

interface UserBadgeProps {
  username: string;
  isTeacher?: boolean;
  showAtSymbol?: boolean;
  link?: boolean;
  onNavigate?: (username: string) => void;
}

export default function UserBadge({
  username,
  isTeacher = false,
  showAtSymbol = true,
  link = true,
  onNavigate,
}: UserBadgeProps) {
  const displayName = showAtSymbol ? `@${username}` : username;

  const content = (
    <div className="flex items-center gap-1.5">
      <span className="font-semibold text-teal-700 dark:text-teal-300 hover:underline">
        {displayName}
      </span>
      {isTeacher && (
        <span className="inline-flex items-center px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold">
          <Award className="w-3 h-3" />
        </span>
      )}
    </div>
  );

  if (link && onNavigate) {
    return (
      <button
        onClick={() => onNavigate(username)}
        className="hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-left"
      >
        {content}
      </button>
    );
  }

  return content;
}
