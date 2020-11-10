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

export const UNSIGNED_INTEGER_REGEX = '^[0-9]*$';
export const SIGNED_DOUBLE_REGEX = '^-?[0-9]+(.[0-9]+)?$';
export const NUMBERS_REGEX = /\d/g;

export function getKeyName(e: KeyboardEvent): string {
  return e.key || mapKeyCodeToKeyName(e.keyCode);
}

export function isActionKey(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey;
}

export function replaceSeparator(value: string, decimalSeparator: string): string {
  const separator = value.replace('-', '').replace(NUMBERS_REGEX, '');
  return value.replace(separator || decimalSeparator, decimalSeparator);
}

export function appendZeroToDecimal(value: string, decimalSeparator: string): string {
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

export function getAllowedKeys(e: KeyboardEvent, decimalSeparator: string): string[] {
  const allowedKeys = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'Escape',
    'Tab',
  ];
  const originalValue: string = (e.target as HTMLInputElement).value;
  const cursorPosition: number =
    (e.target as HTMLInputElement).selectionStart || 0;
  const signExists = originalValue.includes('-');
  const separatorExists = originalValue.includes(decimalSeparator);

  const separatorIsCloseToSign = signExists && cursorPosition <= 1;
  if (!separatorIsCloseToSign && !separatorExists) {
    allowedKeys.push(decimalSeparator);
  }

  const firstCharacterIsSeparator =
    originalValue.charAt(0) === decimalSeparator;
  if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
    allowedKeys.push('-');
  }

  return allowedKeys;
}

export function overrideInputType(input: HTMLInputElement): void {
  input.setAttribute('type', 'text');
  input.setAttribute('inputmode', 'decimal');
}