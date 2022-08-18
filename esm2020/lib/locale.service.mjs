import { Inject, Injectable, Optional } from '@angular/core';
import { NUMERIC_INPUT_LOCALE } from './locale.tokens';
import * as i0 from "@angular/core";
export class LocaleService {
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
        return locales.map(locale => this.localizedToThousandSeparator(this.localizeDecimal(1234.5, locale, options)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9udW1lcmljLWlucHV0L3NyYy9saWIvbG9jYWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUt2RCxNQUFNLE9BQU8sYUFBYTtJQUV4QixZQUE4RCxPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFJLENBQUM7SUFFdkYsb0JBQW9CO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxNQUFNLE9BQU8sR0FBNkIsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDakUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVNLHFCQUFxQjtRQUMxQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEMsTUFBTSxPQUFPLEdBQTZCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFTSxjQUFjLENBQUMsS0FBYTtRQUNqQyxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLDJCQUEyQixDQUFDLGNBQXVDO1FBQ3pFLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3BFLENBQUM7SUFFTyw0QkFBNEIsQ0FBQyxjQUF1QztRQUMxRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRSxDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsT0FBa0M7UUFDdkYsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELElBQVksaUJBQWlCO1FBQzNCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUMzRSxDQUFDO0lBRU8sVUFBVTtRQUNoQixJQUFJO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBYSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RixPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO1FBQUMsTUFBTTtZQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7OzBHQTNDVSxhQUFhLGtCQUVKLG9CQUFvQjs4R0FGN0IsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUdjLE1BQU07MkJBQUMsb0JBQW9COzswQkFBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTlVNRVJJQ19JTlBVVF9MT0NBTEUgfSBmcm9tICcuL2xvY2FsZS50b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5VTUVSSUNfSU5QVVRfTE9DQUxFKSBAT3B0aW9uYWwoKSBwcml2YXRlIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSkgeyB9XG5cbiAgcHVibGljIGdldERlY2ltYWxTZXBhcmF0b3JzKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBsb2NhbGVzID0gdGhpcy5nZXRMb2NhbGVzKCk7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zID0geyB1c2VHcm91cGluZzogZmFsc2UgfTtcbiAgICByZXR1cm4gbG9jYWxlcy5tYXAobG9jYWxlID0+IHRoaXMubG9jYWxpemVkVG9EZWNpbWFsU2VwYXJhdG9yKHRoaXMubG9jYWxpemVEZWNpbWFsKDEuMSwgbG9jYWxlLCBvcHRpb25zKSkpO1xuICB9XG5cbiAgcHVibGljIGdldFRob3VzYW5kU2VwYXJhdG9ycygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgbG9jYWxlcyA9IHRoaXMuZ2V0TG9jYWxlcygpO1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHsgdXNlR3JvdXBpbmc6IHRydWUgfTtcbiAgICByZXR1cm4gbG9jYWxlcy5tYXAobG9jYWxlID0+IHRoaXMubG9jYWxpemVkVG9UaG91c2FuZFNlcGFyYXRvcih0aGlzLmxvY2FsaXplRGVjaW1hbCgxMjM0LjUsIGxvY2FsZSwgb3B0aW9ucykpKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2NhbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcodGhpcy5nZXRMb2NhbGVzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2NhbGl6ZWRUb0RlY2ltYWxTZXBhcmF0b3IobG9jYWxpemVkUGFydHM6IEludGwuTnVtYmVyRm9ybWF0UGFydFtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbG9jYWxpemVkUGFydHMuZmluZChwYXJ0ID0+IHBhcnQudHlwZSA9PT0gJ2RlY2ltYWwnKS52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9jYWxpemVkVG9UaG91c2FuZFNlcGFyYXRvcihsb2NhbGl6ZWRQYXJ0czogSW50bC5OdW1iZXJGb3JtYXRQYXJ0W10pOiBzdHJpbmcge1xuICAgIHJldHVybiBsb2NhbGl6ZWRQYXJ0cy5maW5kKHBhcnQgPT4gcGFydC50eXBlID09PSAnZ3JvdXAnKS52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9jYWxpemVEZWNpbWFsKHZhbHVlOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nLCBvcHRpb25zPzogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zKTogSW50bC5OdW1iZXJGb3JtYXRQYXJ0W10ge1xuICAgIHJldHVybiBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpLmZvcm1hdFRvUGFydHModmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbG9jYWxlRnJvbUJyb3dzZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLmxhbmd1YWdlcyA/IG5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gIH1cblxuICBwcml2YXRlIGdldExvY2FsZXMoKTogc3RyaW5nW10ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWRMb2NhbGVzOiBzdHJpbmdbXSA9IEludGwuTnVtYmVyRm9ybWF0LnN1cHBvcnRlZExvY2FsZXNPZih0aGlzLmxvY2FsZXMpO1xuICAgICAgcmV0dXJuIHN1cHBvcnRlZExvY2FsZXM7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gW3RoaXMubG9jYWxlRnJvbUJyb3dzZXJdO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=