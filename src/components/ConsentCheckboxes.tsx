import { useAuth } from '../contexts/AuthContext';

interface ConsentCheckboxesProps {
  consented: boolean;
  onConsentChange: (value: boolean) => void;
  wantsEbook: boolean;
  onEbookChange: (value: boolean) => void;
  consentError?: string;
}

export default function ConsentCheckboxes({
  consented,
  onConsentChange,
  wantsEbook,
  onEbookChange,
  consentError,
}: ConsentCheckboxesProps) {
  const { onNavigate: _ } = useAuth();

  return (
    <div className="space-y-4">
      <div
        role="checkbox"
        aria-checked={consented}
        tabIndex={0}
        onClick={() => onConsentChange(!consented)}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onConsentChange(!consented); } }}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
        <div className="relative mt-0.5 shrink-0">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              consented
                ? 'bg-teal-600 border-teal-600'
                : consentError
                ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-400 dark:border-gray-500 group-hover:border-teal-500'
            }`}
          >
            {consented && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          I consent to Bespoke IELTS storing and using my data as per our{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-teal-400 underline cursor-pointer hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            Privacy Policy
          </a>.{' '}
          <span className="text-red-500">*</span>
        </span>
      </div>
      {consentError && <p className="text-xs text-red-500">{consentError}</p>}

      <div
        role="checkbox"
        aria-checked={wantsEbook}
        tabIndex={0}
        onClick={() => onEbookChange(!wantsEbook)}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onEbookChange(!wantsEbook); } }}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
        <div className="relative mt-0.5 shrink-0">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              wantsEbook
                ? 'bg-teal-600 border-teal-600'
                : 'border-gray-400 dark:border-gray-500 group-hover:border-teal-500'
            }`}
          >
            {wantsEbook && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Yes, send me a free IELTS ebook and occasional tips to help improve my score (unsubscribe anytime).
        </span>
      </div>
    </div>
  );
}
