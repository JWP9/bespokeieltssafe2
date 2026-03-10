import { useState, useCallback, useRef } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { validateUsername, USERNAME_RULES } from '../utils/usernameValidation';
import { supabase } from '../lib/supabase';

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
  onAvailabilityChange?: (available: boolean) => void;
  disabled?: boolean;
}

export default function UsernameInput({
  value,
  onChange,
  onAvailabilityChange,
  disabled = false,
}: UsernameInputProps) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleChange = (input: string) => {
    onChange(input);
    setValidationError('');
    setAvailable(null);

    const validation = validateUsername(input);
    if (!validation.valid) {
      setValidationError(validation.error || '');
      setAvailable(false);
      onAvailabilityChange?.(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      checkAvailability(input);
    }, 500);
  };

  const checkAvailability = useCallback(async (username: string) => {
    setChecking(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      };
      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-username-availability`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ username }),
        }
      );

      const result = await response.json();

      if (result.available) {
        setAvailable(true);
        setValidationError('');
        onAvailabilityChange?.(true);
      } else {
        setAvailable(false);
        setValidationError(result.error || 'Username not available');
        onAvailabilityChange?.(false);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setAvailable(null);
      onAvailabilityChange?.(false);
    } finally {
      setChecking(false);
    }
  }, [onAvailabilityChange]);

  const hasValue = value.trim().length > 0;
  const isValid = validateUsername(value).valid;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Username
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Choose your username (3-20 characters)"
          disabled={disabled}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-teal-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {hasValue && isValid && (
            <>
              {checking && (
                <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              )}
              {!checking && available && (
                <Check className="w-5 h-5 text-green-500" />
              )}
              {!checking && available === false && (
                <X className="w-5 h-5 text-red-500" />
              )}
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <p className="font-semibold mb-1">Requirements:</p>
          <ul className="space-y-1">
            <li className={`flex items-center gap-2 ${
              value.length >= USERNAME_RULES.MIN_LENGTH && value.length <= USERNAME_RULES.MAX_LENGTH
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500'
            }`}>
              <span className="text-lg leading-none">•</span>
              {USERNAME_RULES.MIN_LENGTH}-{USERNAME_RULES.MAX_LENGTH} characters
            </li>
            <li className={`flex items-center gap-2 ${
              USERNAME_RULES.PATTERN.test(value) || value.length === 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500'
            }`}>
              <span className="text-lg leading-none">•</span>
              Letters, numbers, hyphens, underscores, or Chinese characters
            </li>
          </ul>
        </div>

        {validationError && (
          <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {!validationError && available && (
          <div className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Username is available!</span>
          </div>
        )}
      </div>
    </div>
  );
}
