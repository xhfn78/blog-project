import { MaskConfig } from './types';

/**
 * Default sensitive field names
 */
export const DEFAULT_SENSITIVE_KEYS = [
  'password',
  'passwd',
  'pwd',
  'secret',
  'token',
  'apikey',
  'api_key',
  'accesstoken',
  'access_token',
  'refreshtoken',
  'refresh_token',
  'email',
  'phone',
  'phonenumber',
  'phone_number',
  'mobile',
  'address',
  'ssn',
  'socialsecurity',
  'social_security',
  'creditcard',
  'credit_card',
  'cardnumber',
  'card_number',
  'cvv',
  'cvc',
  'pin',
  'birthdate',
  'birth_date',
  'dob',
];

/**
 * Default mask configuration
 */
export const DEFAULT_MASK_CONFIG: MaskConfig = {
  enabled: true,
  sensitiveKeys: DEFAULT_SENSITIVE_KEYS,
  maskChar: '*',
  showLength: 2,
};

/**
 * Check if a key is sensitive based on the mask configuration
 */
export function isSensitiveKey(key: string, config: MaskConfig): boolean {
  if (!config.enabled) return false;

  const lowerKey = key.toLowerCase();
  return config.sensitiveKeys.some(sensitiveKey =>
    lowerKey.includes(sensitiveKey.toLowerCase())
  );
}

/**
 * Mask a value for security
 */
export function maskValue(
  value: string | number | boolean | null,
  config: MaskConfig
): string {
  if (value === null || value === undefined) return '';

  const strValue = String(value);
  const { maskChar, showLength } = config;

  if (strValue.length <= showLength) {
    return maskChar.repeat(strValue.length);
  }

  const visiblePart = strValue.substring(0, showLength);
  const maskedPart = maskChar.repeat(Math.max(3, strValue.length - showLength));

  return `${visiblePart}${maskedPart}`;
}

/**
 * Apply masking to a value if the key is sensitive
 */
export function applyMasking(
  key: string,
  value: string | number | boolean | null,
  config: MaskConfig
): string | number | boolean | null {
  if (!config.enabled) return value;

  if (isSensitiveKey(key, config)) {
    return maskValue(value, config);
  }

  return value;
}
