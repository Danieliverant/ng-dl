import { Inject, Injectable, Optional } from '@angular/core';
import { NUMERIC_INPUT_LOCALE } from './locale.tokens';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(@Inject(NUMERIC_INPUT_LOCALE) @Optional() private locale?: string) { }

  public getDecimalSeparator(): string {
    const locale = this.getLocale();
    const options: Intl.NumberFormatOptions = { useGrouping: false };

    return this.localizedToDecimalSeparator(this.localizeDecimal(1.1, locale, options));
  }

  private localizedToDecimalSeparator(localizedParts: Intl.NumberFormatPart[]): string {
    return localizedParts.find(part => part.type === 'decimal').value;
  }

  private localizeDecimal(value: number, locale: string, options?: Intl.NumberFormatOptions): Intl.NumberFormatPart[] {
    return Intl.NumberFormat(locale, options).formatToParts(value);
  }

  private get localeFromBrowser(): string {
    return navigator.languages ? navigator.languages[0] : navigator.language;
  }

  private getLocale(): string {
    try {
      const supportedLocales: string[] = Intl.NumberFormat.supportedLocalesOf(this.locale);
      return supportedLocales[0];
    } catch {
      return this.localeFromBrowser;
    }
  }

}
