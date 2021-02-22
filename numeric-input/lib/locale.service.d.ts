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
}
