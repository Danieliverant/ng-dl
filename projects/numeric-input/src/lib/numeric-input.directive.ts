import { AfterViewInit, Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { LocaleService } from './locale.service';
import { mapKeyCodeToKeyName, SIGNED_DOUBLE_REGEX, UNSIGNED_INTEGER_REGEX } from './numeric-input.utils';

@Directive({
  selector: '[dlNumericInput]'
})
export class NumericInputDirective implements AfterViewInit {
  private readonly decimalSeparator = this.localeService.getDecimalSeparator();

  constructor(
    private hostElement: ElementRef,  
    private localeService: LocaleService,
    @Optional() private control?: NgControl
  ) {}

  ngAfterViewInit(): void {
    this.overrideInputType(this.hostElement.nativeElement);
  }

  @HostListener('change') onChange(): void {
    this.parseValue(this.hostElement.nativeElement.value);
  }

  @HostListener('paste', ['$event']) onPaste(e: ClipboardEvent): void {
    const value = e.clipboardData?.getData('text/plain') || '';
    this.parseValue(value);
    e.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(e: DragEvent): void {
    const value = e.dataTransfer?.getData('text') || '';
    this.parseValue(value);
    e.preventDefault();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
    const key: string = this.getKeyName(e);
    const controlOrCommand = e.ctrlKey || e.metaKey;
    const allowedKeys = this.getAllowedKeys(e);
    const actionKeys = ['a', 'c', 'v', 'x'];

    if (allowedKeys.includes(key) || (actionKeys.includes(key) && controlOrCommand)) {
      return;
    }

    const isNumber = new RegExp(UNSIGNED_INTEGER_REGEX).test(key);
    if (isNumber) {
      return;
    }

    e.preventDefault();
  }

  private parseValue(value: string): void {
    const formattedValue = this.appendZeroToDecimal(value);
    const isValid: boolean = new RegExp(SIGNED_DOUBLE_REGEX).test(formattedValue);
    this.setValue(isValid ? formattedValue : '0');
  }

  private getKeyName(e: KeyboardEvent): string {
    return e.key || mapKeyCodeToKeyName(e.keyCode);
  }

  private appendZeroToDecimal(value: string): string {
    const firstCharacter = value.charAt(0);
    if (firstCharacter === this.decimalSeparator) {
      return 0 + value;
    }

    const lastCharacter = value.charAt(value.length - 1);
    if (lastCharacter === this.decimalSeparator) {
      return value + 0;
    }

    return value;
  }

  private setValue(value: string): void {
    this.hostElement.nativeElement.value = value;
    if (this.control) {
      this.control.control?.patchValue(Number(value.replace(this.decimalSeparator, '.')));
    }
  }

  private getAllowedKeys(e: KeyboardEvent): string[] {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'];
    const originalValue: string = (e.target as HTMLInputElement).value;
    const cursorPosition: number = (e.target as HTMLInputElement).selectionStart || 0;
    const signExists = originalValue.includes('-');
    const separatorExists = originalValue.includes(this.decimalSeparator);

    const separatorIsCloseToSign = signExists && cursorPosition <= 1;
    if (!separatorIsCloseToSign && !separatorExists) {
      allowedKeys.push(this.decimalSeparator);
    }

    const firstCharacterIsSeparator = originalValue.charAt(0) === this.decimalSeparator;
    if (!signExists && !firstCharacterIsSeparator && cursorPosition === 0) {
      allowedKeys.push('-');
    }

    return allowedKeys;
  }

  private overrideInputType(input: HTMLInputElement): void {
    input.setAttribute('type', 'text');
    input.setAttribute('inputmode', 'decimal');
  }
}
