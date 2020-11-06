/**
 * support for old browsers.
 */
export function mapKeyCodeToKeyName(keyCode: number): string {
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
