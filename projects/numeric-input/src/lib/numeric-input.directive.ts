import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { LocaleService } from './locale.service';
import {
  appendZeroToDecimal,
  getAllowedKeys,
  getKeyName,
  isActionKey,
  overrideInputType,
  replaceSeparator,
  SIGNED_DOUBLE_REGEX,
  UNSIGNED_INTEGER_REGEX,
} from './numeric-input.utils';

@Directive({
  selector: '[dlNumericInput]',
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
    this.onChange();
    this.onDrop();
    this.onPaste();
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

  private onChange(): void {
    fromEvent(this.el, 'change').pipe(
      takeUntil(this.destroy$),
      tap(() => this.parseValue(this.el.value))
    ).subscribe();
  }

  private onPaste(): void {
    fromEvent(this.el, 'paste').pipe(
      takeUntil(this.destroy$),
      tap((e: ClipboardEvent) => this.parseValue(e.clipboardData?.getData('text/plain') || '')),
      tap((e: ClipboardEvent) => e.preventDefault())
    ).subscribe();
  }

  private onDrop(): void {
    fromEvent(this.el, 'drop').pipe(
      takeUntil(this.destroy$),
      tap((e: DragEvent) => this.parseValue(e.dataTransfer?.getData('text') || '')),
      tap((e: DragEvent) => e.preventDefault())
    ).subscribe();
  }

  private onKeyDown(): void {
    fromEvent(this.el, 'keydown').pipe(
      takeUntil(this.destroy$),
      tap((e: KeyboardEvent) => {
        const key: string = getKeyName(e);
        const allowedKeys = getAllowedKeys(e, this.decimalSeparator);
        const actionKeys = ['a', 'c', 'v', 'x'];
    
        if (
          allowedKeys.includes(key) ||
          (actionKeys.includes(key) && isActionKey(e))
        ) {
          return;
        }
    
        const isNumber = new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
        if (isNumber) {
          return;
        }
    
        e.preventDefault();
      })
    ).subscribe();
  }

  private get el(): HTMLInputElement {
    return this.hostElement.nativeElement;
  }
}
