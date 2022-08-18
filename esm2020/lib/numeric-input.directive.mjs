import { Directive, EventEmitter, Input, Optional, Output, } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { getFormattedValue, isAllowedKey, overrideInputType, validate, } from './numeric-input.utils';
import * as i0 from "@angular/core";
import * as i1 from "./locale.service";
import * as i2 from "@angular/forms";
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
NumericInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputDirective, deps: [{ token: i0.ElementRef }, { token: i1.LocaleService }, { token: i2.NgControl, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NumericInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.3", type: NumericInputDirective, selector: "[dlNumericInput]", inputs: { min: "min", max: "max" }, outputs: { localized: "localized" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: NumericInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dlNumericInput]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.LocaleService }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], localized: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9udW1lcmljLWlucHV0L3NyYy9saWIvbnVtZXJpYy1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixRQUFRLEdBQ1QsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUsvQixNQUFNLE9BQU8scUJBQXFCO0lBU2hDLFlBQ1UsV0FBdUIsRUFDdkIsYUFBNEIsRUFDaEIsT0FBbUI7UUFGL0IsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQVQvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVoQyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUQsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2hFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBTXZDLENBQUM7SUFFSixlQUFlO1FBQ2IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxF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ZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUuc2VydmljZSc7XG5pbXBvcnQge1xuICBnZXRGb3JtYXR0ZWRWYWx1ZSxcbiAgaXNBbGxvd2VkS2V5LFxuICBvdmVycmlkZUlucHV0VHlwZSxcbiAgdmFsaWRhdGUsXG59IGZyb20gJy4vbnVtZXJpYy1pbnB1dC51dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkbE51bWVyaWNJbnB1dF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXREaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gIEBPdXRwdXQoKSBsb2NhbGl6ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlY2ltYWxTZXBhcmF0b3JzID0gdGhpcy5sb2NhbGVTZXJ2aWNlLmdldERlY2ltYWxTZXBhcmF0b3JzKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGhvdXNhbmRTZXBhcmF0b3JzID0gdGhpcy5sb2NhbGVTZXJ2aWNlLmdldFRob3VzYW5kU2VwYXJhdG9ycygpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhvc3RFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgbG9jYWxlU2VydmljZTogTG9jYWxlU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbnRyb2w/OiBOZ0NvbnRyb2xcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBvdmVycmlkZUlucHV0VHlwZSh0aGlzLmVsKTtcbiAgICB0aGlzLm9uS2V5RG93bigpO1xuICAgIHRoaXMub25Gb3JtU3VibWl0KCk7XG4gICAgdGhpcy5vblZhbHVlQ2hhbmdlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gZ2V0Rm9ybWF0dGVkVmFsdWUodmFsdWUsIHRoaXMuZGVjaW1hbFNlcGFyYXRvciwgdGhpcy50aG91c2FuZHNTZXBhcmF0b3IpO1xuICAgIHRoaXMubG9jYWxpemVkLmVtaXQodGhpcy5sb2NhbGVTZXJ2aWNlLmxvY2FsaXplTnVtYmVyKGZvcm1hdHRlZFZhbHVlKSk7XG4gICAgdGhpcy5lbC52YWx1ZSA9IGZvcm1hdHRlZFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5jb250cm9sLmNvbnRyb2w/LnBhdGNoVmFsdWUoZm9ybWF0dGVkVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMuZWwsICdjaGFuZ2UnKS5waXBlKG1hcCgoKSA9PiB0aGlzLmVsLnZhbHVlKSk7XG4gIH1cblxuICBwcml2YXRlIG9uUGFzdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMuZWwsICdwYXN0ZScpLnBpcGUoXG4gICAgICB0YXAoKGU6IENsaXBib2FyZEV2ZW50KSA9PiBlLnByZXZlbnREZWZhdWx0KCkpLFxuICAgICAgbWFwKChlOiBDbGlwYm9hcmRFdmVudCkgPT4gZS5jbGlwYm9hcmREYXRhPy5nZXREYXRhKCd0ZXh0L3BsYWluJykgfHwgJycpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ecm9wKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGZyb21FdmVudCh0aGlzLmVsLCAnZHJvcCcpLnBpcGUoXG4gICAgICB0YXAoKGU6IERyYWdFdmVudCkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKSxcbiAgICAgIG1hcCgoZTogRHJhZ0V2ZW50KSA9PiBlLmRhdGFUcmFuc2Zlcj8uZ2V0RGF0YSgndGV4dCcpIHx8ICcnKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG9uS2V5RG93bigpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5lbCwgJ2tleWRvd24nKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgdGFwKChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5lbC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICAgICAgaWYgKGlzQWxsb3dlZEtleShlLCB0aGlzLmRlY2ltYWxTZXBhcmF0b3JzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIG9uRm9ybVN1Ym1pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbC5mb3JtKSB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5lbC5mb3JtLCAnc3VibWl0JylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgIHRhcCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBnZXRGb3JtYXR0ZWRWYWx1ZShcbiAgICAgICAgICAgICAgdGhpcy5lbC52YWx1ZSxcbiAgICAgICAgICAgICAgdGhpcy5kZWNpbWFsU2VwYXJhdG9yLFxuICAgICAgICAgICAgICB0aGlzLnRob3VzYW5kc1NlcGFyYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0ZSh0aGlzLmVsLCBmb3JtYXR0ZWRWYWx1ZSwgdGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHRoaXMuZWwucmVwb3J0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2UoKTogdm9pZCB7XG4gICAgbWVyZ2UodGhpcy5vbkNoYW5nZSgpLCB0aGlzLm9uRHJvcCgpLCB0aGlzLm9uUGFzdGUoKSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB0aGlzLnNldFZhbHVlKHZhbHVlKSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBlbCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZGVjaW1hbFNlcGFyYXRvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRlY2ltYWxTZXBhcmF0b3JzWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdGhvdXNhbmRzU2VwYXJhdG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGhvdXNhbmRTZXBhcmF0b3JzWzBdO1xuICB9XG59XG4iXX0=