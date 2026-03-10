export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const RESERVED_WORDS = [
  'admin',
  'system',
  'moderator',
  'bot',
  'api',
  'test',
  'root',
  'user',
  'guest',
  'undefined',
  'null',
  'support',
];

export const USERNAME_RULES = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 20,
  PATTERN: /^[a-zA-Z0-9_\-\u4E00-\u9FFF]+$/u,
  NO_START_END_SPECIAL: /^[a-zA-Z0-9\u4E00-\u9FFF].*[a-zA-Z0-9\u4E00-\u9FFF]$|^[a-zA-Z0-9\u4E00-\u9FFF]$/u,
};

export function validateUsername(username: string): ValidationResult {
  const trimmed = username.trim();

  if (!trimmed) {
    return { valid: false, error: 'Username is required' };
  }

  if (trimmed.length < USERNAME_RULES.MIN_LENGTH) {
    return {
      valid: false,
      error: `Username must be at least ${USERNAME_RULES.MIN_LENGTH} characters`,
    };
  }

  if (trimmed.length > USERNAME_RULES.MAX_LENGTH) {
    return {
      valid: false,
      error: `Username must be no more than ${USERNAME_RULES.MAX_LENGTH} characters`,
    };
  }

  if (!USERNAME_RULES.PATTERN.test(trimmed)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, hyphens, underscores, or Chinese characters',
    };
  }

  if (!USERNAME_RULES.NO_START_END_SPECIAL.test(trimmed)) {
    return {
      valid: false,
      error: 'Username cannot start or end with a hyphen or underscore',
    };
  }

  const lowercased = trimmed.toLowerCase();
  if (RESERVED_WORDS.includes(lowercased)) {
    return {
      valid: false,
      error: 'This username is reserved and cannot be used',
    };
  }

  return { valid: true };
}

export function sanitizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

export function formatUsername(username: string): string {
  return `@${username}`;
}
