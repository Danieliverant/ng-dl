import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LocaleService } from './locale.service';
import {
  getFormattedValue,
  isAllowedKey,
  overrideInputType,
  validate,
} from './numeric-input.utils';

@Directive({
  selector: '[dlNumericInput]',
})
export class NumericInputDirective implements AfterViewInit, OnDestroy {
  @Input() min: number;
  @Input() max: number;
  @Output() localized = new EventEmitter<string>();

  private readonly decimalSeparators = this.localeService.getDecimalSeparators();
  private readonly thousandSeparators = this.localeService.getThousandSeparators();
  private readonly destroy$ = new Subject();

  constructor(
    private hostElement: ElementRef,
    private localeService: LocaleService,
    @Optional() private control?: NgControl
  ) {}

  ngAfterViewInit(): void {
    overrideInputType(this.el);
    this.onKeyDown();
    this.onFormSubmit();
    this.onValueChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private setValue(value: string): void {
    const formattedValue = getFormattedValue(value, this.decimalSeparator, this.thousandsSeparator);
    this.localized.emit(this.localeService.localizeNumber(formattedValue));
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
          this.el.setCustomValidity('');
          if (isAllowedKey(e, this.decimalSeparators)) {
            return;
          }
          e.preventDefault();
        })
      )
      .subscribe();
  }

  private onFormSubmit(): void {
    if (this.el.form) {
      fromEvent(this.el.form, 'submit')
        .pipe(
          takeUntil(this.destroy$),
          tap((e) => {
            const formattedValue = getFormattedValue(
              this.el.value,
              this.decimalSeparator,
              this.thousandsSeparator
            );
            const isValid = validate(this.el, formattedValue, this.min, this.max);
            if (!isValid) {
              e.preventDefault();
              this.el.reportValidity();
            }
          })
        )
        .subscribe();
    }
  }

  private onValueChange(): void {
    merge(this.onChange(), this.onDrop(), this.onPaste())
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.setValue(value));
  }

  private get el(): HTMLInputElement {
    return this.hostElement.nativeElement;
  }

  private get decimalSeparator(): string {
    return this.decimalSeparators[0];
  }

  private get thousandsSeparator(): string {
    return this.thousandSeparators[0];
  }
}
