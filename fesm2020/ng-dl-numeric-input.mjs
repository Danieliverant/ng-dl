import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import * as i2 from '@angular/forms';

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
    'Enter'
];
/**
 * Override input attributes for validation and mobile support.
 * @param input - input element
 */
function overrideInputType(input) {
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
function getFormattedValue(value, decimalSeparator, thousandsSeparator) {
    const formatted = Number(parseValue(value, decimalSeparator, thousandsSeparator).replace(decimalSeparator, '.'));
    return isNaN(formatted) ? DEFAULT_NUMERIC_VALUE : formatted;
}
/**
 * Check if the pressed key is allowed in the numeric input field.
 * @param e - keyboard event.
 * @param decimalSeparators - array of supported separators.
 */
function isAllowedKey(e, decimalSeparators) {
    const key = getKeyName(e);
    const allowedKeys = getAllowedKeys(e, decimalSeparators);
    return (allowedKeys.includes(key) ||
        (DEFAULT_ACTION_KEYS.includes(key) && isActionKey(e)) ||
        isNumberKey(e));
}
/**
 * Align all browsers to validate as same as Chrome browser does.
 * Validation will be after the field loose focus and with Chrome default messages.
 * @param el - input element.
 * @param value - input value.
 * @param min - minimum valid value.
 * @param max - maximum valid value.
 */
function validate(el, value, min, max) {
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
function mapKeyCodeToKeyName(keyCode) {
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
function parseValue(value, decimalSeparator, thousandSeparator) {
    value = replaceDecimalSeparator(value, decimalSeparator);
    value = appendZeroToDecimal(value, decimalSeparator);
    value = removeThousandsSeparator(value, thousandSeparator);
    const isValid = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
    return isValid ? value : DEFAULT_NUMERIC_VALUE.toString();
}
function replaceDecimalSeparator(value, decimalSeparator) {
    const separator = value.replace('-', '').replace(NUMBERS_REGEX, '');
    return value.replace(separator || decimalSeparator, decimalSeparator);
}
function appendZeroToDecimal(value, decimalSeparator) {
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
function removeThousandsSeparator(value, thousandsSeparator) {
    return value.replace(thousandsSeparator, '');
}
function isActionKey(e) {
    return e.ctrlKey || e.metaKey;
}
function getKeyName(e) {
    return e.key || mapKeyCodeToKeyName(e.keyCode);
}
function isNumberKey(e) {
    const key = getKeyName(e);
    return new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
}
function getAllowedKeys(e, decimalSeparators) {
    const allowedKeys = [...DEFAULT_ALLOWED_KEYS];
    const originalValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;
    const signExists = originalValue.includes('-');
    const separatorExists = decimalSeparators.some((separator) => originalValue.includes(separator));
    const separatorIsCloseToSign = signExists && cursorPosition <= 1;
    if (!separatorIsCloseToSign && !separatorExists) {
        allowedKeys.push(...decimalSeparators);
    }
    const firstCharacterIsSeparator = decimalSeparators.some((separator) => originalValue.charAt(0) === separator);
    if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
        allowedKeys.push('-');
    }
    return allowedKeys;
}

const NUMERIC_INPUT_LOCALE = new InjectionToken('NUMERIC_INPUT_LOCALE');

class LocaleService {
    constructor(locales) {
        this.locales = locales;
    }
    getDecimalSeparators() {
        const locales = this.getLocales();
        const options = { useGrouping: false };
        return locales.map(locale => this.localizedToDecimalSeparator(this.localizeDecimal(1.1, locale, options)));
    }
    getThousandSeparators() {
        const locales = this.getLocales();
        const options = { useGrouping: true };
        return locales.map(locale => this.localizedToThousandSeparator(this.localizeDecimal(12345.6, locale, options)));
    }
    localizeNumber(value) {
        return value.toLocaleString(this.getLocales());
    }
    localizedToDecimalSeparator(localizedParts) {
        return localizedParts.find(part => part.type === 'decimal').value;
    }
    localizedToThousandSeparator(localizedParts) {
        return localizedParts.find(part => part.type === 'group').value;
    }
    localizeDecimal(value, locale, options) {
        return Intl.NumberFormat(locale, options).formatToParts(value);
    }
    get localeFromBrowser() {
        return navigator.languages ? navigator.languages[0] : navigator.language;
    }
    getLocales() {
        try {
            const supportedLocales = Intl.NumberFormat.supportedLocalesOf(this.locales);
            return supportedLocales;
        }
        catch {
            return [this.localeFromBrowser];
        }
    }
}
LocaleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LocaleService, deps: [{ token: NUMERIC_INPUT_LOCALE, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
LocaleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LocaleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: LocaleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NUMERIC_INPUT_LOCALE]
                }, {
                    type: Optional
                }] }]; } });

class NumericInputDirective {
    constructor(hostElement, localeService, control) {
        this.hostElement = hostElement;
        this.localeService = localeService;
        this.control = control;
        this.localized = new EventEmitter();
        this.decimalSeparators = this.localeService.getDecimalSeparators();
        this.thousandSeparators = this.localeService.getThousandSeparators();
        this.destroy$ = new Subject();
    }
    ngAfterViewInit() {
        overrideInputType(this.el);
        this.onKeyDown();
        this.onFormSubmit();
        this.onValueChange();
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    setValue(value) {
        const formattedValue = getFormattedValue(value, this.decimalSeparator, this.thousandsSeparator);
        this.localized.emit(this.localeService.localizeNumber(formattedValue));
        this.el.value = formattedValue.toString();
        if (this.control) {
            this.control.control?.patchValue(formattedValue);
        }
    }
    onChange() {
        return fromEvent(this.el, 'change').pipe(map(() => this.el.value));
    }
    onPaste() {
        return fromEvent(this.el, 'paste').pipe(tap((e) => e.preventDefault()), map((e) => e.clipboardData?.getData('text/plain') || ''));
    }
    onDrop() {
        return fromEvent(this.el, 'drop').pipe(tap((e) => e.preventDefault()), map((e) => e.dataTransfer?.getData('text') || ''));
    }
    onKeyDown() {
        fromEvent(this.el, 'keydown')
            .pipe(takeUntil(this.destroy$), tap((e) => {
            this.el.setCustomValidity('');
            if (isAllowedKey(e, this.decimalSeparators)) {
                return;
            }
            e.preventDefault();
        }))
            .subscribe();
    }
    onFormSubmit() {
        if (this.el.form) {
            fromEvent(this.el.form, 'submit')
                .pipe(takeUntil(this.destroy$), tap((e) => {
                const formattedValue = getFormattedValue(this.el.value, this.decimalSeparator, this.thousandsSeparator);
                const isValid = validate(this.el, formattedValue, this.min, this.max);
                if (!isValid) {
                    e.preventDefault();
                    this.el.reportValidity();
                }
            }))
                .subscribe();
        }
    }
    onValueChange() {
        merge(this.onChange(), this.onDrop(), this.onPaste())
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => this.setValue(value));
    }
    get el() {
        return this.hostElement.nativeElement;
    }
    get decimalSeparator() {
        return this.decimalSeparators[0];
    }
    get thousandsSeparator() {
        return this.thousandSeparators[0];
    }
}
NumericInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputDirective, deps: [{ token: i0.ElementRef }, { token: LocaleService }, { token: i2.NgControl, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NumericInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.3", type: NumericInputDirective, selector: "[dlNumericInput]", inputs: { min: "min", max: "max" }, outputs: { localized: "localized" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dlNumericInput]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: LocaleService }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], localized: [{
                type: Output
            }] } });

class NumericInputModule {
}
NumericInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NumericInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3", ngImport: i0, type: NumericInputModule, declarations: [NumericInputDirective], exports: [NumericInputDirective] });
NumericInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NumericInputDirective],
                    imports: [],
                    exports: [NumericInputDirective]
                }]
        }] });

/*
 * Public API Surface of numeric-input
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NUMERIC_INPUT_LOCALE, NumericInputDirective, NumericInputModule };
//# sourceMappingURL=ng-dl-numeric-input.mjs.map
