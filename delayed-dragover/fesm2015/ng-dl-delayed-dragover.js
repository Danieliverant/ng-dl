import { Component, EventEmitter, Directive, ElementRef, Input, Output, NgModule } from '@angular/core';
import { fromEvent, merge, timer, EMPTY } from 'rxjs';
import { tap, switchMap, delay } from 'rxjs/operators';

const DEFAULT_TEXT = 'Hover Me';
class DelayedDragoverComponent {
    constructor() {
        this.text = DEFAULT_TEXT;
    }
    changeText() {
        this.text += ' - Hovered With Delay!';
    }
    changePreText() {
        this.resetText();
        this.text += ' - Hovered With Pre Delay!';
    }
    resetText() {
        this.text = DEFAULT_TEXT;
    }
}
DelayedDragoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'dl-delayed-dragover',
                template: `
    <h3>Dragover for 1 second</h3>
    <div dlDelayedDragover (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>
    <h3>Dragover for 2 seconds see the pre-delayed and another second for the delay</h3>
    <div dlDelayedDragover [dlDragoverDelayStep]="2000" (preDragoverDelayed)="changePreText()"
         (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>
  `
            },] }
];

const DEFAULT_DRAG_OVER_CLASS = 'drag-over';
const DEFAULT_DELAY = 1000;
/**
 * Delays the dragover event.
 */
class DelayedDragoverDirective {
    constructor(element) {
        this.element = element;
        this.delay = DEFAULT_DELAY;
        /**
         * Delay before the dlDragoverDelay.
         * Useful for letting the user change his mind after the first delay -
         * i.e. hovering over paginator -> page number changes color -> page changes.
         */
        this.delayStep = 0;
        this.dragoverDelayed = new EventEmitter();
        /**
         * Emits if dlDragoverDelayStep is in use.
         * Useful for letting the user change his mind after the first delay -
         * i.e. hovering over paginator -> (preDragoverDelayed emits) page number changes color -> page changes.
         */
        this.preDragoverDelayed = new EventEmitter();
        // using counter to fix these issues:
        // https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
        // https://stackoverflow.com/questions/14203734/dragend-dragenter-and-dragleave-firing-off-immediately-when-i-drag
        this.dragoverCounter = 0;
    }
    set class(value) {
        this._class = value || DEFAULT_DRAG_OVER_CLASS;
    }
    get class() {
        return this._class;
    }
    ngOnInit() {
        const hide$ = fromEvent(this.element.nativeElement, 'dragleave').pipe(tap(_ => this.dragoverCounter--));
        const show$ = fromEvent(this.element.nativeElement, 'dragenter').pipe(tap(_ => this.dragoverCounter++));
        merge(hide$, show$)
            .pipe(tap(() => this.element.nativeElement.classList.remove(this.class)), switchMap(_ => {
            if (this.dragoverCounter > 0) {
                return timer(this.delay).pipe(tap(() => this.element.nativeElement.classList.add(this.class)), tap(() => this.delayStep && this.preDragoverDelayed.emit()), delay(this.delayStep));
            }
            return EMPTY;
        }))
            .subscribe(this.dragoverDelayed);
    }
}
DelayedDragoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dlDelayedDragover]'
            },] }
];
DelayedDragoverDirective.ctorParameters = () => [
    { type: ElementRef }
];
DelayedDragoverDirective.propDecorators = {
    class: [{ type: Input, args: ['dlDragover',] }],
    delay: [{ type: Input, args: ['dlDragoverDelay',] }],
    delayStep: [{ type: Input, args: ['dlDragoverDelayStep',] }],
    dragoverDelayed: [{ type: Output }],
    preDragoverDelayed: [{ type: Output }]
};

class DelayedDragoverModule {
}
DelayedDragoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DelayedDragoverComponent, DelayedDragoverDirective],
                imports: [],
                exports: [DelayedDragoverComponent, DelayedDragoverDirective]
            },] }
];

/*
 * Public API Surface of delayed-dragover
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DelayedDragoverComponent, DelayedDragoverDirective, DelayedDragoverModule };
//# sourceMappingURL=ng-dl-delayed-dragover.js.map
