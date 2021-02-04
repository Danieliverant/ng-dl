import { Directive, ElementRef, EventEmitter, Input, Optional, Output, } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LocaleService } from './locale.service';
import { getFormattedValue, isAllowedKey, overrideInputType, validate, } from './numeric-input.utils';
export class NumericInputDirective {
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
        var _a;
        const formattedValue = getFormattedValue(value, this.decimalSeparator, this.thousandsSeparator);
        this.localized.emit(this.localeService.localizeNumber(formattedValue));
        this.el.value = formattedValue.toString();
        if (this.control) {
            (_a = this.control.control) === null || _a === void 0 ? void 0 : _a.patchValue(formattedValue);
        }
    }
    onChange() {
        return fromEvent(this.el, 'change').pipe(map(() => this.el.value));
    }
    onPaste() {
        return fromEvent(this.el, 'paste').pipe(tap((e) => e.preventDefault()), map((e) => { var _a; return ((_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/plain')) || ''; }));
    }
    onDrop() {
        return fromEvent(this.el, 'drop').pipe(tap((e) => e.preventDefault()), map((e) => { var _a; return ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text')) || ''; }));
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
NumericInputDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line
                selector: '[dlNumericInput]',
            },] }
];
NumericInputDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: LocaleService },
    { type: NgControl, decorators: [{ type: Optional }] }
];
NumericInputDirective.propDecorators = {
    min: [{ type: Input }],
    max: [{ type: Input }],
    localized: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdHJhdmlzL2J1aWxkL0RhbmllbGl2ZXJhbnQvbmctZGwvcHJvamVjdHMvbnVtZXJpYy1pbnB1dC9zcmMvIiwic291cmNlcyI6WyJsaWIvbnVtZXJpYy1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixRQUFRLEdBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQU0vQixNQUFNLE9BQU8scUJBQXFCO0lBU2hDLFlBQ1UsV0FBdUIsRUFDdkIsYUFBNEIsRUFDaEIsT0FBbUI7UUFGL0IsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQVQvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVoQyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUQsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2hFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxD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QVVILGFBQWE7WUFIYixTQUFTLHVCQTJCYixRQUFROzs7a0JBWFYsS0FBSztrQkFDTCxLQUFLO3dCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9jYWxlU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgZ2V0Rm9ybWF0dGVkVmFsdWUsXG4gIGlzQWxsb3dlZEtleSxcbiAgb3ZlcnJpZGVJbnB1dFR5cGUsXG4gIHZhbGlkYXRlLFxufSBmcm9tICcuL251bWVyaWMtaW5wdXQudXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHNlbGVjdG9yOiAnW2RsTnVtZXJpY0lucHV0XScsXG59KVxuZXhwb3J0IGNsYXNzIE51bWVyaWNJbnB1dERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgQE91dHB1dCgpIGxvY2FsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVjaW1hbFNlcGFyYXRvcnMgPSB0aGlzLmxvY2FsZVNlcnZpY2UuZ2V0RGVjaW1hbFNlcGFyYXRvcnMoKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0aG91c2FuZFNlcGFyYXRvcnMgPSB0aGlzLmxvY2FsZVNlcnZpY2UuZ2V0VGhvdXNhbmRTZXBhcmF0b3JzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaG9zdEVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBsb2NhbGVTZXJ2aWNlOiBMb2NhbGVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgY29udHJvbD86IE5nQ29udHJvbFxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIG92ZXJyaWRlSW5wdXRUeXBlKHRoaXMuZWwpO1xuICAgIHRoaXMub25LZXlEb3duKCk7XG4gICAgdGhpcy5vbkZvcm1TdWJtaXQoKTtcbiAgICB0aGlzLm9uVmFsdWVDaGFuZ2UoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBnZXRGb3JtYXR0ZWRWYWx1ZSh2YWx1ZSwgdGhpcy5kZWNpbWFsU2VwYXJhdG9yLCB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcik7XG4gICAgdGhpcy5sb2NhbGl6ZWQuZW1pdCh0aGlzLmxvY2FsZVNlcnZpY2UubG9jYWxpemVOdW1iZXIoZm9ybWF0dGVkVmFsdWUpKTtcbiAgICB0aGlzLmVsLnZhbHVlID0gZm9ybWF0dGVkVmFsdWUudG9TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5jb250cm9sKSB7XG4gICAgICB0aGlzLmNvbnRyb2wuY29udHJvbD8ucGF0Y2hWYWx1ZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5lbCwgJ2NoYW5nZScpLnBpcGUobWFwKCgpID0+IHRoaXMuZWwudmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgb25QYXN0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5lbCwgJ3Bhc3RlJykucGlwZShcbiAgICAgIHRhcCgoZTogQ2xpcGJvYXJkRXZlbnQpID0+IGUucHJldmVudERlZmF1bHQoKSksXG4gICAgICBtYXAoKGU6IENsaXBib2FyZEV2ZW50KSA9PiBlLmNsaXBib2FyZERhdGE/LmdldERhdGEoJ3RleHQvcGxhaW4nKSB8fCAnJylcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkRyb3AoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMuZWwsICdkcm9wJykucGlwZShcbiAgICAgIHRhcCgoZTogRHJhZ0V2ZW50KSA9PiBlLnByZXZlbnREZWZhdWx0KCkpLFxuICAgICAgbWFwKChlOiBEcmFnRXZlbnQpID0+IGUuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0JykgfHwgJycpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25LZXlEb3duKCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmVsLCAna2V5ZG93bicpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICB0YXAoKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmVsLnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcbiAgICAgICAgICBpZiAoaXNBbGxvd2VkS2V5KGUsIHRoaXMuZGVjaW1hbFNlcGFyYXRvcnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Gb3JtU3VibWl0KCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmVsLmZvcm0sICdzdWJtaXQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgdGFwKChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBnZXRGb3JtYXR0ZWRWYWx1ZShcbiAgICAgICAgICAgIHRoaXMuZWwudmFsdWUsXG4gICAgICAgICAgICB0aGlzLmRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICB0aGlzLnRob3VzYW5kc1NlcGFyYXRvclxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaXNWYWxpZCA9IHZhbGlkYXRlKHRoaXMuZWwsIGZvcm1hdHRlZFZhbHVlLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5lbC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZSgpOiB2b2lkIHtcbiAgICBtZXJnZSh0aGlzLm9uQ2hhbmdlKCksIHRoaXMub25Ecm9wKCksIHRoaXMub25QYXN0ZSgpKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHRoaXMuc2V0VmFsdWUodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGVsKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIGdldCBkZWNpbWFsU2VwYXJhdG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVjaW1hbFNlcGFyYXRvcnNbMF07XG4gIH1cblxuICBwcml2YXRlIGdldCB0aG91c2FuZHNTZXBhcmF0b3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50aG91c2FuZFNlcGFyYXRvcnNbMF07XG4gIH1cbn1cbiJdfQ==