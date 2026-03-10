import { useState } from 'react';
import { X, AlertTriangle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TrialBannerProps {
  onNavigate: (page: string) => void;
}

export default function TrialBanner({ onNavigate }: TrialBannerProps) {
  const { user, profile, trialExpired } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!user || dismissed) return null;

  if (trialExpired) {
    return (
      <div className="fixed top-16 left-0 right-0 z-40 bg-amber-600 text-white px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Your 7-day trial has ended. Upgrade to continue unlimited access.</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('pricing')}
            className="text-xs font-semibold bg-white text-amber-700 px-3 py-1 rounded-full hover:bg-amber-50 transition-colors whitespace-nowrap"
          >
            Upgrade — from $8/mo
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (profile?.role === 'premium_trial' && profile.trial_end) {
    const daysLeft = Math.ceil(
      (new Date(profile.trial_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 2 && daysLeft > 0) {
      return (
        <div className="fixed top-16 left-0 right-0 z-40 bg-teal-700 text-white px-4 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span>
              {daysLeft === 1
                ? 'Your trial ends tomorrow. Upgrade for $8/mo Early Bird — unlimited mocks & AI feedback.'
                : `${daysLeft} days of your free trial remaining. Upgrade to keep full access.`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-semibold bg-white text-teal-700 px-3 py-1 rounded-full hover:bg-teal-50 transition-colors whitespace-nowrap"
            >
              Upgrade — from $8/mo
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
  }

  return null;
}
