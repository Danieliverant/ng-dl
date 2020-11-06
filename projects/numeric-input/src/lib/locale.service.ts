import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { LOCALE } from './locale.tokens';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(@Inject(LOCALE) @Optional() private locale?: string) { }

  public getDecimalSeparator(): string {
    const locale = this.locale || this.localeFromBrowser;
    const options: Intl.NumberFormatOptions = { useGrouping: false };

    return this.localizedToDecimalSeparator(this.localizeDecimal(1.1, locale, options));
  }

  private localizedToDecimalSeparator(val: string): string {
    return val.replace(/\d/g, '');
  }

  private localizeDecimal(value: number, locale: string, options?: Intl.NumberFormatOptions): string {
    return Intl.NumberFormat(locale, options).format(value);
  }

  private get localeFromBrowser(): string {
    return navigator.languages ? navigator.languages[0] : navigator.language;
  }

}
