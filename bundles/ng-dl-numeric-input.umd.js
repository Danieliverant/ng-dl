(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ng-dl/numeric-input', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-dl'] = global['ng-dl'] || {}, global['ng-dl']['numeric-input'] = {}), global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i0, forms, rxjs, operators) { 'use strict';

    var NUMERIC_INPUT_LOCALE = new i0.InjectionToken('NUMERIC_INPUT_LOCALE');

    var LocaleService = /** @class */ (function () {
        function LocaleService(locales) {
            this.locales = locales;
        }
        LocaleService.prototype.getDecimalSeparators = function () {
            var _this = this;
            var locales = this.getLocales();
            var options = { useGrouping: false };
            return locales.map(function (locale) { return _this.localizedToDecimalSeparator(_this.localizeDecimal(1.1, locale, options)); });
        };
        LocaleService.prototype.getThousandSeparators = function () {
            var _this = this;
            var locales = this.getLocales();
            var options = { useGrouping: true };
            return locales.map(function (locale) { return _this.localizedToThousandSeparator(_this.localizeDecimal(1234.5, locale, options)); });
        };
        LocaleService.prototype.localizeNumber = function (value) {
            return value.toLocaleString(this.getLocales());
        };
        LocaleService.prototype.localizedToDecimalSeparator = function (localizedParts) {
            return localizedParts.find(function (part) { return part.type === 'decimal'; }).value;
        };
        LocaleService.prototype.localizedToThousandSeparator = function (localizedParts) {
            return localizedParts.find(function (part) { return part.type === 'group'; }).value;
        };
        LocaleService.prototype.localizeDecimal = function (value, locale, options) {
            return Intl.NumberFormat(locale, options).formatToParts(value);
        };
        Object.defineProperty(LocaleService.prototype, "localeFromBrowser", {
            get: function () {
                return navigator.languages ? navigator.languages[0] : navigator.language;
            },
            enumerable: false,
            configurable: true
        });
        LocaleService.prototype.getLocales = function () {
            try {
                var supportedLocales = Intl.NumberFormat.supportedLocalesOf(this.locales);
                return supportedLocales;
            }
            catch (_a) {
                return [this.localeFromBrowser];
            }
        };
        return LocaleService;
    }());
    LocaleService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocaleService_Factory() { return new LocaleService(i0.ɵɵinject(NUMERIC_INPUT_LOCALE, 8)); }, token: LocaleService, providedIn: "root" });
    LocaleService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    LocaleService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [NUMERIC_INPUT_LOCALE,] }, { type: i0.Optional }] }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var UNSIGNED_INTEGER_REGEX = '^[0-9]*$';
    var SIGNED_DOUBLE_REGEX = '^-?[0-9]+(.[0-9]+)?$';
    var NUMBERS_REGEX = /\d/g;
    var CHROME_MIN_VALIDATION_MESSAGE = 'Value must be greater than or equal to';
    var CHROME_MAX_VALIDATION_MESSAGE = 'Value must be less than or equal to';
    var DEFAULT_NUMERIC_VALUE = 0;
    var DEFAULT_ACTION_KEYS = ['a', 'c', 'v', 'x'];
    var DEFAULT_ALLOWED_KEYS = [
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
        var formatted = Number(parseValue(value, decimalSeparator, thousandsSeparator).replace(decimalSeparator, '.'));
        return isNaN(formatted) ? DEFAULT_NUMERIC_VALUE : formatted;
    }
    /**
     * Check if the pressed key is allowed in the numeric input field.
     * @param e - keyboard event.
     * @param decimalSeparators - array of supported separators.
     */
    function isAllowedKey(e, decimalSeparators) {
        var key = getKeyName(e);
        var allowedKeys = getAllowedKeys(e, decimalSeparators);
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
            el.setCustomValidity(CHROME_MIN_VALIDATION_MESSAGE + " " + min + ".");
            return false;
        }
        if (value > max) {
            el.setCustomValidity(CHROME_MAX_VALIDATION_MESSAGE + " " + max + ".");
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
        var isValid = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
        return isValid ? value : DEFAULT_NUMERIC_VALUE.toString();
    }
    function replaceDecimalSeparator(value, decimalSeparator) {
        var separator = value.replace('-', '').replace(NUMBERS_REGEX, '');
        return value.replace(separator || decimalSeparator, decimalSeparator);
    }
    function appendZeroToDecimal(value, decimalSeparator) {
        var firstCharacter = value.charAt(0);
        if (firstCharacter === decimalSeparator) {
            return 0 + value;
        }
        var lastCharacter = value.charAt(value.length - 1);
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
        var key = getKeyName(e);
        return new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
    }
    function getAllowedKeys(e, decimalSeparators) {
        var allowedKeys = __spread(DEFAULT_ALLOWED_KEYS);
        var originalValue = e.target.value;
        var cursorPosition = e.target.selectionStart || 0;
        var signExists = originalValue.includes('-');
        var separatorExists = decimalSeparators.some(function (separator) { return originalValue.includes(separator); });
        var separatorIsCloseToSign = signExists && cursorPosition <= 1;
        if (!separatorIsCloseToSign && !separatorExists) {
            allowedKeys.push.apply(allowedKeys, __spread(decimalSeparators));
        }
        var firstCharacterIsSeparator = decimalSeparators.some(function (separator) { return originalValue.charAt(0) === separator; });
        if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
            allowedKeys.push('-');
        }
        return allowedKeys;
    }

    var NumericInputDirective = /** @class */ (function () {
        function NumericInputDirective(hostElement, localeService, control) {
            this.hostElement = hostElement;
            this.localeService = localeService;
            this.control = control;
            this.localized = new i0.EventEmitter();
            this.decimalSeparators = this.localeService.getDecimalSeparators();
            this.thousandSeparators = this.localeService.getThousandSeparators();
            this.destroy$ = new rxjs.Subject();
        }
        NumericInputDirective.prototype.ngAfterViewInit = function () {
            overrideInputType(this.el);
            this.onKeyDown();
            this.onFormSubmit();
            this.onValueChange();
        };
        NumericInputDirective.prototype.ngOnDestroy = function () {
            this.destroy$.next();
        };
        NumericInputDirective.prototype.setValue = function (value) {
            var _a;
            var formattedValue = getFormattedValue(value, this.decimalSeparator, this.thousandsSeparator);
            this.localized.emit(this.localeService.localizeNumber(formattedValue));
            this.el.value = formattedValue.toString();
            if (this.control) {
                (_a = this.control.control) === null || _a === void 0 ? void 0 : _a.patchValue(formattedValue);
            }
        };
        NumericInputDirective.prototype.onChange = function () {
            var _this = this;
            return rxjs.fromEvent(this.el, 'change').pipe(operators.map(function () { return _this.el.value; }));
        };
        NumericInputDirective.prototype.onPaste = function () {
            return rxjs.fromEvent(this.el, 'paste').pipe(operators.tap(function (e) { return e.preventDefault(); }), operators.map(function (e) { var _a; return ((_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/plain')) || ''; }));
        };
        NumericInputDirective.prototype.onDrop = function () {
            return rxjs.fromEvent(this.el, 'drop').pipe(operators.tap(function (e) { return e.preventDefault(); }), operators.map(function (e) { var _a; return ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text')) || ''; }));
        };
        NumericInputDirective.prototype.onKeyDown = function () {
            var _this = this;
            rxjs.fromEvent(this.el, 'keydown')
                .pipe(operators.takeUntil(this.destroy$), operators.tap(function (e) {
                _this.el.setCustomValidity('');
                if (isAllowedKey(e, _this.decimalSeparators)) {
                    return;
                }
                e.preventDefault();
            }))
                .subscribe();
        };
        NumericInputDirective.prototype.onFormSubmit = function () {
            var _this = this;
            rxjs.fromEvent(this.el.form, 'submit')
                .pipe(operators.takeUntil(this.destroy$), operators.tap(function (e) {
                var formattedValue = getFormattedValue(_this.el.value, _this.decimalSeparator, _this.thousandsSeparator);
                var isValid = validate(_this.el, formattedValue, _this.min, _this.max);
                if (!isValid) {
                    e.preventDefault();
                    _this.el.reportValidity();
                }
            }))
                .subscribe();
        };
        NumericInputDirective.prototype.onValueChange = function () {
            var _this = this;
            rxjs.merge(this.onChange(), this.onDrop(), this.onPaste())
                .pipe(operators.takeUntil(this.destroy$))
                .subscribe(function (value) { return _this.setValue(value); });
        };
        Object.defineProperty(NumericInputDirective.prototype, "el", {
            get: function () {
                return this.hostElement.nativeElement;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumericInputDirective.prototype, "decimalSeparator", {
            get: function () {
                return this.decimalSeparators[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumericInputDirective.prototype, "thousandsSeparator", {
            get: function () {
                return this.thousandSeparators[0];
            },
            enumerable: false,
            configurable: true
        });
        return NumericInputDirective;
    }());
    NumericInputDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[dlNumericInput]',
                },] }
    ];
    NumericInputDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: LocaleService },
        { type: forms.NgControl, decorators: [{ type: i0.Optional }] }
    ]; };
    NumericInputDirective.propDecorators = {
        min: [{ type: i0.Input }],
        max: [{ type: i0.Input }],
        localized: [{ type: i0.Output }]
    };

    var NumericInputModule = /** @class */ (function () {
        function NumericInputModule() {
        }
        return NumericInputModule;
    }());
    NumericInputModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [NumericInputDirective],
                    imports: [],
                    exports: [NumericInputDirective]
                },] }
    ];

    /*
     * Public API Surface of numeric-input
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NUMERIC_INPUT_LOCALE = NUMERIC_INPUT_LOCALE;
    exports.NumericInputModule = NumericInputModule;
    exports.ɵa = NumericInputDirective;
    exports.ɵb = LocaleService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-dl-numeric-input.umd.js.map
