const UNSIGNED_INTEGER_REGEX = '^[0-9]*$';
const SIGNED_DOUBLE_REGEX = '^-?[0-9]+(.[0-9]+)?$';
const NUMBERS_REGEX = /\d/g;
const actionKeys = ['a', 'c', 'v', 'x'];
const defaultAllowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'];

export function overrideInputType(input: HTMLInputElement): void {
  input.setAttribute('type', 'text');
  input.setAttribute('inputmode', 'decimal');
}

export function parseValue(value: string, decimalSeparator: string): string {
  value = replaceSeparator(value, decimalSeparator);
  value = appendZeroToDecimal(value, decimalSeparator);
  const isValid: boolean = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
  return isValid ? value : '0';
}

export function isAllowedKey(e: KeyboardEvent, decimalSeparator: string): boolean {
  const key: string = getKeyName(e);
  const allowedKeys = getAllowedKeys(e, decimalSeparator);
  return allowedKeys.includes(key) || (actionKeys.includes(key) && isActionKey(e)) || isNumberKey(e);
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

function getKeyName(e: KeyboardEvent): string {
  return e.key || mapKeyCodeToKeyName(e.keyCode);
}

function isNumberKey(e: KeyboardEvent): boolean {
  const key = getKeyName(e);
  return new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
}

function getAllowedKeys(e: KeyboardEvent, decimalSeparator: string): string[] {
  const originalValue: string = (e.target as HTMLInputElement).value;
  const cursorPosition: number = (e.target as HTMLInputElement).selectionStart || 0;
  const signExists = originalValue.includes('-');
  const separatorExists = originalValue.includes(decimalSeparator);

  const separatorIsCloseToSign = signExists && cursorPosition <= 1;
  if (!separatorIsCloseToSign && !separatorExists) {
    defaultAllowedKeys.push(decimalSeparator);
  }

  const firstCharacterIsSeparator = originalValue.charAt(0) === decimalSeparator;
  if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
    defaultAllowedKeys.push('-');
  }

  return defaultAllowedKeys;
}
