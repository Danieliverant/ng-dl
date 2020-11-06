import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { LocaleService } from './locale.service';

@Directive({
  selector: '[dlNumericInput]'
})
export class NumericInputDirective {
  private readonly decimalSeparator = this.localeService.getDecimalSeparator();
  private readonly integerUnsigned = '^[0-9]*$';
  private readonly decimalSigned = '^-?[0-9]+(.[0-9]+)?$';

  constructor(
    private hostElement: ElementRef,  
    private localeService: LocaleService,
    @Optional() private control?: NgControl
  ) {}

  @HostListener('change', ['$event']) onChange() {
    this.parseValue(this.hostElement.nativeElement.value);
  }

  @HostListener('paste', ['$event']) onPaste(e: ClipboardEvent) {
    const value = e.clipboardData?.getData('text/plain') || '';
    this.parseValue(value);
    e.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    const value = e.dataTransfer?.getData('text') || '';
    this.parseValue(value);
    e.preventDefault();
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    const key: string = this.getKeyName(e);
    const controlOrCommand = e.ctrlKey || e.metaKey;
    const allowedKeys = this.getAllowedKeys(e);
    const actionKeys = ['a', 'c', 'v', 'x'];

    if (allowedKeys.includes(key) || (actionKeys.includes(key) && controlOrCommand)) {
      return;
    }

    const isNumber = new RegExp(this.integerUnsigned).test(key);
    if (isNumber) {
      return;
    } else {
      e.preventDefault();
    }
  }

  private parseValue(value: string): void {
    const regex: string = this.decimalSigned;
    const formattedValue = this.appendDecimalSeparator(value);
    const isValid: boolean = new RegExp(regex).test(formattedValue);
    this.setValue(isValid ? formattedValue : '0');
  }

  private getKeyName(e: KeyboardEvent): string {
    if (e.key) {
      return e.key;
    } else {
      // for old browsers
      if (e.keyCode && String.fromCharCode) {
        switch (e.keyCode) {
          case 8:
            return 'Backspace';
          case 9:
            return 'Tab';
          case 27:
            return 'Escape';
          case 37:
            return 'ArrowLeft';
          case 39:
            return 'ArrowRight';
          case 188:
            return ',';
          case 190:
            return '.';
          case 109:
          case 173:
          case 189:
            return '-';
          default:
            return String.fromCharCode(e.keyCode);
        }
      }
      return '';
    }
  }

  private appendDecimalSeparator(value: string): string {
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
}
