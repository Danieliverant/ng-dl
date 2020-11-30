const UNSIGNED_INTEGER_REGEX = '^[0-9]*$';
const SIGNED_DOUBLE_REGEX = '^-?[0-9]+(.[0-9]+)?$';
const NUMBERS_REGEX = /\d/g;
const CHROME_MIN_VALIDATION_MESSAGE = 'Value must be greater than or equal to';
const CHROME_MAX_VALIDATION_MESSAGE = 'Value must be less than or equal to';
const actionKeys = ['a', 'c', 'v', 'x'];
const defaultAllowedKeys = [
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
  'Escape',
  'Tab',
];

export function overrideInputType(input: HTMLInputElement): void {
  input.setAttribute('type', 'text');
  input.setAttribute('inputmode', 'decimal');
  input.removeAttribute('pattern');
}

export function getFormattedValue(
  value: string,
  decimalSeparator: string
): number {
  return Number(
    parseValue(value, decimalSeparator).replace(decimalSeparator, '.')
  );
}

export function isAllowedKey(
  e: KeyboardEvent,
  decimalSeparators: string[]
): boolean {
  const key: string = getKeyName(e);
  const allowedKeys = getAllowedKeys(e, decimalSeparators);
  return (
    allowedKeys.includes(key) ||
    (actionKeys.includes(key) && isActionKey(e)) ||
    isNumberKey(e)
  );
}

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

function parseValue(value: string, decimalSeparator: string): string {
  value = replaceSeparator(value, decimalSeparator);
  value = appendZeroToDecimal(value, decimalSeparator);
  const isValid: boolean = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
  return isValid ? value : '0';
}

function replaceSeparator(value: string, decimalSeparator: string): string {
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

function isActionKey(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey;
}

export function getKeyName(e: KeyboardEvent): string {
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
  const originalValue: string = (e.target as HTMLInputElement).value;
  const cursorPosition: number =
    (e.target as HTMLInputElement).selectionStart || 0;
  const signExists = originalValue.includes('-');
  const separatorExists = decimalSeparators.some((separator) =>
    originalValue.includes(separator)
  );

  const separatorIsCloseToSign = signExists && cursorPosition <= 1;
  if (!separatorIsCloseToSign && !separatorExists) {
    defaultAllowedKeys.push(...decimalSeparators);
  }

  const firstCharacterIsSeparator = decimalSeparators.some(
    (separator) => originalValue.charAt(0) === separator
  );
  
  if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
    defaultAllowedKeys.push('-');
  }

  return defaultAllowedKeys;
}
