import { AfterViewInit, Directive, ElementRef, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LocaleService } from './locale.service';
import {
  appendZeroToDecimal,
  isAllowedKey,
  isNumberKey,
  overrideInputType,
  replaceSeparator,
  SIGNED_DOUBLE_REGEX
} from './numeric-input.utils';

@Directive({
  selector: '[dlNumericInput]'
})
export class NumericInputDirective implements AfterViewInit, OnDestroy {
  private readonly decimalSeparator = this.localeService.getDecimalSeparator();
  private readonly destroy$ = new Subject();

  constructor(
    private hostElement: ElementRef,
    private localeService: LocaleService,
    @Optional() private control?: NgControl
  ) {}

  ngAfterViewInit(): void {
    overrideInputType(this.el);

    this.onKeyDown();
    this.onValueChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private parseValue(value: string): void {
    value = replaceSeparator(value, this.decimalSeparator);
    value = appendZeroToDecimal(value, this.decimalSeparator);
    const isValid: boolean = new RegExp(SIGNED_DOUBLE_REGEX).test(value);
    this.setValue(isValid ? value : '0');
  }

  private setValue(value: string): void {
    const formattedValue = Number(value.replace(this.decimalSeparator, '.'));
    this.el.value = formattedValue.toString();
    if (this.control) {
      this.control.control?.patchValue(formattedValue);
    }
  }

  private onChange(): Observable<string> {
    return fromEvent(this.el, 'change').pipe(map(() => this.el.value));
  }

  private onPaste(): Observable<string> {
    return fromEvent(this.el, 'paste').pipe(
      tap((e: ClipboardEvent) => e.preventDefault()),
      map((e: ClipboardEvent) => e.clipboardData?.getData('text/plain') || '')
    );
  }

  private onDrop(): Observable<string> {
    return fromEvent(this.el, 'drop').pipe(
      tap((e: DragEvent) => e.preventDefault()),
      map((e: DragEvent) => e.dataTransfer?.getData('text') || '')
    );
  }

  private onKeyDown(): void {
    fromEvent(this.el, 'keydown')
      .pipe(
        takeUntil(this.destroy$),
        tap((e: KeyboardEvent) => {
          if (isAllowedKey(e, this.decimalSeparator) || isNumberKey(e)) {
            return;
          }
          e.preventDefault();
        })
      )
      .subscribe();
  }

  private onValueChange(): void {
    merge(this.onChange(), this.onDrop(), this.onPaste())
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.parseValue(value));
  }

  private get el(): HTMLInputElement {
    return this.hostElement.nativeElement;
  }
}
