import { Inject, Injectable, Optional } from '@angular/core';
import { NUMERIC_INPUT_LOCALE } from './locale.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./locale.tokens";
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
        catch (_a) {
            return [this.localeFromBrowser];
        }
    }
}
LocaleService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocaleService_Factory() { return new LocaleService(i0.ɵɵinject(i1.NUMERIC_INPUT_LOCALE, 8)); }, token: LocaleService, providedIn: "root" });
LocaleService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
LocaleService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NUMERIC_INPUT_LOCALE,] }, { type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9udW1lcmljLWlucHV0L3NyYy9saWIvbG9jYWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFLdkQsTUFBTSxPQUFPLGFBQWE7SUFFeEIsWUFBOEQsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBSSxDQUFDO0lBRXZGLG9CQUFvQjtRQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEMsTUFBTSxPQUFPLEdBQTZCLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2pFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFTSxxQkFBcUI7UUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sT0FBTyxHQUE2QixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNoRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQWE7UUFDakMsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTywyQkFBMkIsQ0FBQyxjQUF1QztRQUN6RSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNwRSxDQUFDO0lBRU8sNEJBQTRCLENBQUMsY0FBdUM7UUFDMUUsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEUsQ0FBQztJQUVPLGVBQWUsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLE9BQWtDO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFZLGlCQUFpQjtRQUMzQixPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDM0UsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSTtZQUNGLE1BQU0sZ0JBQWdCLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEYsT0FBTyxnQkFBZ0IsQ0FBQztTQUN6QjtRQUFDLFdBQU07WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7O1lBOUNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OzRDQUdjLE1BQU0sU0FBQyxvQkFBb0IsY0FBRyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTlVNRVJJQ19JTlBVVF9MT0NBTEUgfSBmcm9tICcuL2xvY2FsZS50b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGVTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5VTUVSSUNfSU5QVVRfTE9DQUxFKSBAT3B0aW9uYWwoKSBwcml2YXRlIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSkgeyB9XG5cbiAgcHVibGljIGdldERlY2ltYWxTZXBhcmF0b3JzKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBsb2NhbGVzID0gdGhpcy5nZXRMb2NhbGVzKCk7XG4gICAgY29uc3Qgb3B0aW9uczogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zID0geyB1c2VHcm91cGluZzogZmFsc2UgfTtcbiAgICByZXR1cm4gbG9jYWxlcy5tYXAobG9jYWxlID0+IHRoaXMubG9jYWxpemVkVG9EZWNpbWFsU2VwYXJhdG9yKHRoaXMubG9jYWxpemVEZWNpbWFsKDEuMSwgbG9jYWxlLCBvcHRpb25zKSkpO1xuICB9XG5cbiAgcHVibGljIGdldFRob3VzYW5kU2VwYXJhdG9ycygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgbG9jYWxlcyA9IHRoaXMuZ2V0TG9jYWxlcygpO1xuICAgIGNvbnN0IG9wdGlvbnM6IEludGwuTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHsgdXNlR3JvdXBpbmc6IHRydWUgfTtcbiAgICByZXR1cm4gbG9jYWxlcy5tYXAobG9jYWxlID0+IHRoaXMubG9jYWxpemVkVG9UaG91c2FuZFNlcGFyYXRvcih0aGlzLmxvY2FsaXplRGVjaW1hbCgxMjM0LjUsIGxvY2FsZSwgb3B0aW9ucykpKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2NhbGl6ZU51bWJlcih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUudG9Mb2NhbGVTdHJpbmcodGhpcy5nZXRMb2NhbGVzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2NhbGl6ZWRUb0RlY2ltYWxTZXBhcmF0b3IobG9jYWxpemVkUGFydHM6IEludGwuTnVtYmVyRm9ybWF0UGFydFtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbG9jYWxpemVkUGFydHMuZmluZChwYXJ0ID0+IHBhcnQudHlwZSA9PT0gJ2RlY2ltYWwnKS52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9jYWxpemVkVG9UaG91c2FuZFNlcGFyYXRvcihsb2NhbGl6ZWRQYXJ0czogSW50bC5OdW1iZXJGb3JtYXRQYXJ0W10pOiBzdHJpbmcge1xuICAgIHJldHVybiBsb2NhbGl6ZWRQYXJ0cy5maW5kKHBhcnQgPT4gcGFydC50eXBlID09PSAnZ3JvdXAnKS52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9jYWxpemVEZWNpbWFsKHZhbHVlOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nLCBvcHRpb25zPzogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zKTogSW50bC5OdW1iZXJGb3JtYXRQYXJ0W10ge1xuICAgIHJldHVybiBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpLmZvcm1hdFRvUGFydHModmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbG9jYWxlRnJvbUJyb3dzZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLmxhbmd1YWdlcyA/IG5hdmlnYXRvci5sYW5ndWFnZXNbMF0gOiBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gIH1cblxuICBwcml2YXRlIGdldExvY2FsZXMoKTogc3RyaW5nW10ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWRMb2NhbGVzOiBzdHJpbmdbXSA9IEludGwuTnVtYmVyRm9ybWF0LnN1cHBvcnRlZExvY2FsZXNPZih0aGlzLmxvY2FsZXMpO1xuICAgICAgcmV0dXJuIHN1cHBvcnRlZExvY2FsZXM7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gW3RoaXMubG9jYWxlRnJvbUJyb3dzZXJdO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=