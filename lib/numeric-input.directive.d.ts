import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { LocaleService } from './locale.service';
export declare class NumericInputDirective implements AfterViewInit, OnDestroy {
    private hostElement;
    private localeService;
    private control?;
    min: number;
    max: number;
    localized: EventEmitter<string>;
    private readonly decimalSeparators;
    private readonly thousandSeparators;
    private readonly destroy$;
    constructor(hostElement: ElementRef, localeService: LocaleService, control?: NgControl);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private setValue;
    private onChange;
    private onPaste;
    private onDrop;
    private onKeyDown;
    private onFormSubmit;
    private onValueChange;
    private get el();
    private get decimalSeparator();
    private get thousandsSeparator();
}
