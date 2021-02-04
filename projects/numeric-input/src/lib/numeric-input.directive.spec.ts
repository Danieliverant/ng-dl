import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NumericInputDirective } from './numeric-input.directive';

describe('dlNumericInput', () => {
  let testFixture: ComponentFixture<TestComponent>;
  let eventAlphabetic: KeyboardEvent;
  let eventNumeric: KeyboardEvent;

  afterEach(() => {
    testFixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NumericInputDirective]
    });
    eventAlphabetic = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
    eventNumeric = new KeyboardEvent('keydown', { key: '3', cancelable: true });
  });

  it('should allow key - regular input', () => {
    const input = dispatchInputEvent(testFixture, eventAlphabetic, false);
    expect(input.value).toEqual(eventAlphabetic.key);
    expect(eventAlphabetic.defaultPrevented).toBeFalsy();
  });

  it('should allow key - input with directive', () => {
    const input = dispatchInputEvent(testFixture, eventNumeric, true);
    expect(input.value).toEqual(eventNumeric.key);
    expect(eventNumeric.defaultPrevented).toBeFalsy();
  });

  it('should prevent key - input with directive', () => {
    dispatchInputEvent(testFixture, eventAlphabetic, true);
    expect(eventAlphabetic.defaultPrevented).toBeTruthy();
  });

  it('should parse value', () => {
    const input = getInput(testFixture, true);
    input.value = '12,41';
    input.dispatchEvent(new Event('change'));
    expect(input.value).toEqual('12.41');
  });

  it('should parse a negative value', () => {
    const input = getInput(testFixture, true);
    input.value = '-12,41';
    input.dispatchEvent(new Event('change'));
    expect(input.value).toEqual('-12.41');
  });
});

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-cmp',
  template: ``
})
class TestComponent {
  constructor() {}
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  const component = TestBed.overrideComponent(TestComponent, { set: { template } }).createComponent(TestComponent);
  component.detectChanges();
  return component;
}

function getInput(fixture: ComponentFixture<TestComponent>, applyDirective: boolean): HTMLInputElement {
  if (applyDirective) {
    fixture = createTestComponent('<form><input id="test-input" dlNumericInput/></form>');
  } else {
    fixture = createTestComponent('<form><input id="test-input"/></form>');
  }

  const input: HTMLInputElement = (fixture.nativeElement as HTMLInputElement).querySelector('#test-input');
  return input;
}

function dispatchInputEvent(
  fixture: ComponentFixture<TestComponent>,
  event: KeyboardEvent,
  applyDirective: boolean
): HTMLInputElement {
  const input = getInput(fixture, applyDirective);
  input.focus();
  input.value = event.key;
  input.dispatchEvent(event);
  return input;
}
