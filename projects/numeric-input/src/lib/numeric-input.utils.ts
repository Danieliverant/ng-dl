const UNSIGNED_INTEGER_REGEX = '^[0-9]*$';
const SIGNED_DOUBLE_REGEX = '^-?[0-9]+(.[0-9]+)?$';
const NUMBERS_REGEX = /\d/g;
const CHROME_MIN_VALIDATION_MESSAGE = 'Value must be greater than or equal to';
const CHROME_MAX_VALIDATION_MESSAGE = 'Value must be less than or equal to';
const DEFAULT_NUMERIC_VALUE = 0;
const DEFAULT_ACTION_KEYS = ['a', 'c', 'v', 'x'];
const DEFAULT_ALLOWED_KEYS = [
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
  'Escape',
  'Tab',
];

/**
 * Override input attributes for validation and mobile support.
 * @param input - input element
 */
export function overrideInputType(input: HTMLInputElement): void {
  input.setAttribute('type', 'text');
  input.setAttribute('inputmode', 'decimal');
  input.removeAttribute('pattern');
}

/**
 * Get formatted value, if the value is a valid numeric value it will be formatted if not a default value will be returned.
 * @param value - value to format.
 * @param decimalSeparator - decimal separator to replace (if needed).
 * @param thousandsSeparator - thousands separator to remove (if needed).
 */
export function getFormattedValue(
  value: string,
  decimalSeparator: string,
  thousandsSeparator: string
): number {
  const formatted = Number(
    parseValue(value, decimalSeparator, thousandsSeparator).replace(decimalSeparator, '.')
  );
  return isNaN(formatted) ? DEFAULT_NUMERIC_VALUE : formatted;
}

/**
 * Check if the pressed key is allowed in the numeric input field.
 * @param e - keyboard event.
 * @param decimalSeparators - array of supported separators.
 */
export function isAllowedKey(
  e: KeyboardEvent,
  decimalSeparators: string[]
): boolean {
  const key: string = getKeyName(e);
  const allowedKeys = getAllowedKeys(e, decimalSeparators);
  return (
    allowedKeys.includes(key) ||
    (DEFAULT_ACTION_KEYS.includes(key) && isActionKey(e)) ||
    isNumberKey(e)
  );
}

/**
 * Align all browsers to validate as same as Chrome browser does.
 * Validation will be after the field loose focus and with Chrome default messages.
 * @param el - input element.
 * @param value - input value.
 * @param min - minimum valid value.
 * @param max - maximum valid value.
 */
export function validate(
  el: HTMLInputElement,
  value: number,
  min?: number,
  max?: number
): boolean {
  if (value < min) {
    el.setCustomValidity(`${CHROME_MIN_VALIDATION_MESSAGE} ${min}.`);
    return false;
  }

  if (value > max) {
    el.setCustomValidity(`${CHROME_MAX_VALIDATION_MESSAGE} ${max}.`);
    return false;
  }

  el.setCustomValidity('');
  return true;
}

/**
 * support for old browsers.
 */
function mapKeyCodeToKeyName(keyCode: number): string {
  if (keyCode && String.fromCharCode) {
    switch (keyCode) {
      case 8:
        return 'Backspace';
      case 9:
        return 'Tab';
      case 27:
        return 'Escape';
      case 37:
        return 'ArrowLeft';
      case 39:
        return 'ArrowRight';
      case 188:
        return ',';
      case 190:
        return '.';
      case 109:
      case 173:
      case 189:
        return '-';
      default:
        return String.fromCharCode(keyCode);
    }
  }
  return '';
}

/**
 * Add zero to decimal values, replaces the decimal separator and remove the thousand separator.
 * If the value is a numeric value the parsed value will be returned, if not - the default numeric value.
 * @param value - value to parse.
 * @param decimalSeparator - decimal separator to replace (if needed).
 * @param thousandsSeparator - thousands separator to remove (if needed).
 */
function parseValue(value: string, decimalSeparator: string, thousandSeparator: string): string {
  value = replaceDecimalSeparator(value, decimalSeparator);
  value = appendZeroToDecimal(value, decimalSeparator);
  value = removeThousandsSeparator(value, thousandSeparator);
  const isValid: boolean = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
  return isValid ? value : DEFAULT_NUMERIC_VALUE.toString();
}

function replaceDecimalSeparator(value: string, decimalSeparator: string): string {
  const separator = value.replace('-', '').replace(NUMBERS_REGEX, '');
  return value.replace(separator || decimalSeparator, decimalSeparator);
}

function appendZeroToDecimal(value: string, decimalSeparator: string): string {
  const firstCharacter = value.charAt(0);
  if (firstCharacter === decimalSeparator) {
    return 0 + value;
  }

  const lastCharacter = value.charAt(value.length - 1);
  if (lastCharacter === decimalSeparator) {
    return value + 0;
  }

  return value;
}

function removeThousandsSeparator(value: string, thousandsSeparator: string): string {
  return value.replace(thousandsSeparator, '');
}

function isActionKey(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey;
}

function getKeyName(e: KeyboardEvent): string {
  return e.key || mapKeyCodeToKeyName(e.keyCode);
}

function isNumberKey(e: KeyboardEvent): boolean {
  const key = getKeyName(e);
  return new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
}

function getAllowedKeys(
  e: KeyboardEvent,
  decimalSeparators: string[]
): string[] {
  const allowedKeys = [...DEFAULT_ALLOWED_KEYS];
  const originalValue: string = (e.target as HTMLInputElement).value;
  const cursorPosition: number =
    (e.target as HTMLInputElement).selectionStart || 0;
  const signExists = originalValue.includes('-');
  const separatorExists = decimalSeparators.some((separator) =>
    originalValue.includes(separator)
  );

  const separatorIsCloseToSign = signExists && cursorPosition <= 1;
  if (!separatorIsCloseToSign && !separatorExists) {
    allowedKeys.push(...decimalSeparators);
  }

  const firstCharacterIsSeparator = decimalSeparators.some(
    (separator) => originalValue.charAt(0) === separator
  );

  if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
    allowedKeys.push('-');
  }

  return allowedKeys;
}
