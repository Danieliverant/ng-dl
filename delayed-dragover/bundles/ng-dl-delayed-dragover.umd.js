(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
  typeof define === 'function' && define.amd ? define('@ng-dl/delayed-dragover', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ng-dl'] = global['ng-dl'] || {}, global['ng-dl']['delayed-dragover'] = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, rxjs, operators) { 'use strict';

  var DEFAULT_TEXT = 'Hover Me';
  var DelayedDragoverComponent = /** @class */ (function () {
      function DelayedDragoverComponent() {
          this.text = DEFAULT_TEXT;
      }
      DelayedDragoverComponent.prototype.changeText = function () {
          this.text += ' - Hovered With Delay!';
      };
      DelayedDragoverComponent.prototype.changePreText = function () {
          this.resetText();
          this.text += ' - Hovered With Pre Delay!';
      };
      DelayedDragoverComponent.prototype.resetText = function () {
          this.text = DEFAULT_TEXT;
      };
      return DelayedDragoverComponent;
  }());
  DelayedDragoverComponent.decorators = [
      { type: core.Component, args: [{
                  selector: 'dl-delayed-dragover',
                  template: "\n    <h3>Dragover for 1 second</h3>\n    <div dlDelayedDragover (dragoverDelayed)=\"changeText()\" (dragleave)=\"resetText()\">{{ text }}</div>\n    <h3>Dragover for 2 seconds see the pre-delayed and another second for the delay</h3>\n    <div dlDelayedDragover [dlDragoverDelayStep]=\"2000\" (preDragoverDelayed)=\"changePreText()\"\n         (dragoverDelayed)=\"changeText()\" (dragleave)=\"resetText()\">{{ text }}</div>\n  "
              },] }
  ];

  var DEFAULT_DRAG_OVER_CLASS = 'drag-over';
  var DEFAULT_DELAY = 1000;
  /**
   * Delays the dragover event.
   */
  var DelayedDragoverDirective = /** @class */ (function () {
      function DelayedDragoverDirective(element) {
          this.element = element;
          this.delay = DEFAULT_DELAY;
          /**
           * Delay before the dlDragoverDelay.
           * Useful for letting the user change his mind after the first delay -
           * i.e. hovering over paginator -> page number changes color -> page changes.
           */
          this.delayStep = 0;
          this.dragoverDelayed = new core.EventEmitter();
          /**
           * Emits if dlDragoverDelayStep is in use.
           * Useful for letting the user change his mind after the first delay -
           * i.e. hovering over paginator -> (preDragoverDelayed emits) page number changes color -> page changes.
           */
          this.preDragoverDelayed = new core.EventEmitter();
          // using counter to fix these issues:
          // https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
          // https://stackoverflow.com/questions/14203734/dragend-dragenter-and-dragleave-firing-off-immediately-when-i-drag
          this.dragoverCounter = 0;
      }
      Object.defineProperty(DelayedDragoverDirective.prototype, "class", {
          get: function () {
              return this._class;
          },
          set: function (value) {
              this._class = value || DEFAULT_DRAG_OVER_CLASS;
          },
          enumerable: false,
          configurable: true
      });
      DelayedDragoverDirective.prototype.ngOnInit = function () {
          var _this = this;
          var hide$ = rxjs.fromEvent(this.element.nativeElement, 'dragleave').pipe(operators.tap(function (_) { return _this.dragoverCounter--; }));
          var show$ = rxjs.fromEvent(this.element.nativeElement, 'dragenter').pipe(operators.tap(function (_) { return _this.dragoverCounter++; }));
          rxjs.merge(hide$, show$)
              .pipe(operators.tap(function () { return _this.element.nativeElement.classList.remove(_this.class); }), operators.switchMap(function (_) {
              if (_this.dragoverCounter > 0) {
                  return rxjs.timer(_this.delay).pipe(operators.tap(function () { return _this.element.nativeElement.classList.add(_this.class); }), operators.tap(function () { return _this.delayStep && _this.preDragoverDelayed.emit(); }), operators.delay(_this.delayStep));
              }
              return rxjs.EMPTY;
          }))
              .subscribe(this.dragoverDelayed);
      };
      return DelayedDragoverDirective;
  }());
  DelayedDragoverDirective.decorators = [
      { type: core.Directive, args: [{
                  selector: '[dlDelayedDragover]'
              },] }
  ];
  DelayedDragoverDirective.ctorParameters = function () { return [
      { type: core.ElementRef }
  ]; };
  DelayedDragoverDirective.propDecorators = {
      class: [{ type: core.Input, args: ['dlDragover',] }],
      delay: [{ type: core.Input, args: ['dlDragoverDelay',] }],
      delayStep: [{ type: core.Input, args: ['dlDragoverDelayStep',] }],
      dragoverDelayed: [{ type: core.Output }],
      preDragoverDelayed: [{ type: core.Output }]
  };

  var DelayedDragoverModule = /** @class */ (function () {
      function DelayedDragoverModule() {
      }
      return DelayedDragoverModule;
  }());
  DelayedDragoverModule.decorators = [
      { type: core.NgModule, args: [{
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

  exports.DelayedDragoverComponent = DelayedDragoverComponent;
  exports.DelayedDragoverDirective = DelayedDragoverDirective;
  exports.DelayedDragoverModule = DelayedDragoverModule;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-dl-delayed-dragover.umd.js.map
