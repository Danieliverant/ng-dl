import * as i0 from "@angular/core";
export declare class LocaleService {
    private locales?;
    constructor(locales?: string | string[]);
    getDecimalSeparators(): string[];
    getThousandSeparators(): string[];
    localizeNumber(value: number): string;
    private localizedToDecimalSeparator;
    private localizedToThousandSeparator;
    private localizeDecimal;
    private get localeFromBrowser();
    private getLocales;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocaleService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocaleService>;
}
