/**
 * Override input attributes for validation and mobile support.
 * @param input - input element
 */
export declare function overrideInputType(input: HTMLInputElement): void;
/**
 * Get formatted value, if the value is a valid numeric value it will be formatted if not a default value will be returned.
 * @param value - value to format.
 * @param decimalSeparator - decimal separator to replace (if needed).
 * @param thousandsSeparator - thousands separator to remove (if needed).
 */
export declare function getFormattedValue(value: string, decimalSeparator: string, thousandsSeparator: string): number;
/**
 * Check if the pressed key is allowed in the numeric input field.
 * @param e - keyboard event.
 * @param decimalSeparators - array of supported separators.
 */
export declare function isAllowedKey(e: KeyboardEvent, decimalSeparators: string[]): boolean;
/**
 * Align all browsers to validate as same as Chrome browser does.
 * Validation will be after the field loose focus and with Chrome default messages.
 * @param el - input element.
 * @param value - input value.
 * @param min - minimum valid value.
 * @param max - maximum valid value.
 */
export declare function validate(el: HTMLInputElement, value: number, min?: number, max?: number): boolean;
