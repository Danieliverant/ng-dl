(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/Danieliverant/ng-dl/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "MR6/":
/*!*************************************************************************!*\
  !*** ./projects/delayed-dragover/src/lib/delayed-dragover.directive.ts ***!
  \*************************************************************************/
/*! exports provided: DelayedDragoverDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverDirective", function() { return DelayedDragoverDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




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
        this.dragoverDelayed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Emits if dlDragoverDelayStep is in use.
         * Useful for letting the user change his mind after the first delay -
         * i.e. hovering over paginator -> (preDragoverDelayed emits) page number changes color -> page changes.
         */
        this.preDragoverDelayed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        const hide$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(this.element.nativeElement, 'dragleave').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => this.dragoverCounter--));
        const show$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(this.element.nativeElement, 'dragenter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => this.dragoverCounter++));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(hide$, show$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => this.element.nativeElement.classList.remove(this.class)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(_ => {
            if (this.dragoverCounter > 0) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(this.delay).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => this.element.nativeElement.classList.add(this.class)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => this.delayStep && this.preDragoverDelayed.emit()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(this.delayStep));
            }
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
        }))
            .subscribe(this.dragoverDelayed);
    }
}
DelayedDragoverDirective.ɵfac = function DelayedDragoverDirective_Factory(t) { return new (t || DelayedDragoverDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
DelayedDragoverDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: DelayedDragoverDirective, selectors: [["", "dlDelayedDragover", ""]], inputs: { class: ["dlDragover", "class"], delay: ["dlDragoverDelay", "delay"], delayStep: ["dlDragoverDelayStep", "delayStep"] }, outputs: { dragoverDelayed: "dragoverDelayed", preDragoverDelayed: "preDragoverDelayed" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DelayedDragoverDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[dlDelayedDragover]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { class: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['dlDragover']
        }], delay: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['dlDragoverDelay']
        }], delayStep: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['dlDragoverDelayStep']
        }], dragoverDelayed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], preDragoverDelayed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-dl/numeric-input */ "4pee");
/* harmony import */ var _projects_delayed_dragover_src_lib_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projects/delayed-dragover/src/lib/delayed-dragover.component */ "daTh");




class AppComponent {
    constructor() {
        this.title = 'ng-dl';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 21, vars: 4, consts: [["placeholder", "only numbers...", "required", "", "type", "number", 3, "min", "max"], ["placeholder", "only numbers...", "required", "", "dlNumericInput", "", 3, "min", "max"], ["type", "submit"], ["draggable", "true"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Numeric Input Demo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "min=2;max=10;");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Regular Input (type=\"number\"): ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Numeric Input (dlNumericInput): ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Delayed Dragover Demo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Drag Me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "dl-delayed-dragover");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", 2)("max", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("min", 2)("max", 10);
    } }, directives: [_ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_1__["ɵa"], _projects_delayed_dragover_src_lib_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-dl/numeric-input */ "4pee");
/* harmony import */ var projects_delayed_dragover_src_public_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! projects/delayed-dragover/src/public-api */ "jtSP");




// import {
//   NUMERIC_INPUT_LOCALE,
//   NumericInputModule,
// } from 'projects/numeric-input/src/public-api';



class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [{ provide: _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__["NUMERIC_INPUT_LOCALE"], useValue: ['en-us'] }], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__["NumericInputModule"], projects_delayed_dragover_src_public_api__WEBPACK_IMPORTED_MODULE_5__["DelayedDragoverModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__["NumericInputModule"], projects_delayed_dragover_src_public_api__WEBPACK_IMPORTED_MODULE_5__["DelayedDragoverModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
                imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__["NumericInputModule"], projects_delayed_dragover_src_public_api__WEBPACK_IMPORTED_MODULE_5__["DelayedDragoverModule"]],
                providers: [{ provide: _ng_dl_numeric_input__WEBPACK_IMPORTED_MODULE_4__["NUMERIC_INPUT_LOCALE"], useValue: ['en-us'] }],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "daTh":
/*!*************************************************************************!*\
  !*** ./projects/delayed-dragover/src/lib/delayed-dragover.component.ts ***!
  \*************************************************************************/
/*! exports provided: DelayedDragoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverComponent", function() { return DelayedDragoverComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delayed-dragover.directive */ "MR6/");



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
DelayedDragoverComponent.ɵfac = function DelayedDragoverComponent_Factory(t) { return new (t || DelayedDragoverComponent)(); };
DelayedDragoverComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DelayedDragoverComponent, selectors: [["dl-delayed-dragover"]], decls: 8, vars: 3, consts: [["dlDelayedDragover", "", 3, "dragoverDelayed", "dragleave"], ["dlDelayedDragover", "", 3, "dlDragoverDelayStep", "preDragoverDelayed", "dragoverDelayed", "dragleave"]], template: function DelayedDragoverComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Dragover for 1 second");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dragoverDelayed", function DelayedDragoverComponent_Template_div_dragoverDelayed_2_listener() { return ctx.changeText(); })("dragleave", function DelayedDragoverComponent_Template_div_dragleave_2_listener() { return ctx.resetText(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Dragover for 2 seconds see the pre-delayed and another second for the delay");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("preDragoverDelayed", function DelayedDragoverComponent_Template_div_preDragoverDelayed_6_listener() { return ctx.changePreText(); })("dragoverDelayed", function DelayedDragoverComponent_Template_div_dragoverDelayed_6_listener() { return ctx.changeText(); })("dragleave", function DelayedDragoverComponent_Template_div_dragleave_6_listener() { return ctx.resetText(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.text);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dlDragoverDelayStep", 2000);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.text);
    } }, directives: [_delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverDirective"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DelayedDragoverComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'dl-delayed-dragover',
                template: `
    <h3>Dragover for 1 second</h3>
    <div dlDelayedDragover (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>
    <h3>Dragover for 2 seconds see the pre-delayed and another second for the delay</h3>
    <div dlDelayedDragover [dlDragoverDelayStep]="2000" (preDragoverDelayed)="changePreText()"
         (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>
  `
            }]
    }], null, null); })();


/***/ }),

/***/ "jtSP":
/*!*****************************************************!*\
  !*** ./projects/delayed-dragover/src/public-api.ts ***!
  \*****************************************************/
/*! exports provided: DelayedDragoverComponent, DelayedDragoverModule, DelayedDragoverDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/delayed-dragover.component */ "daTh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverComponent", function() { return _lib_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_0__["DelayedDragoverComponent"]; });

/* harmony import */ var _lib_delayed_dragover_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/delayed-dragover.module */ "kPR6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverModule", function() { return _lib_delayed_dragover_module__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverModule"]; });

/* harmony import */ var _lib_delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/delayed-dragover.directive */ "MR6/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverDirective", function() { return _lib_delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverDirective"]; });

/*
 * Public API Surface of delayed-dragover
 */





/***/ }),

/***/ "kPR6":
/*!**********************************************************************!*\
  !*** ./projects/delayed-dragover/src/lib/delayed-dragover.module.ts ***!
  \**********************************************************************/
/*! exports provided: DelayedDragoverModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DelayedDragoverModule", function() { return DelayedDragoverModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _delayed_dragover_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./delayed-dragover.component */ "daTh");
/* harmony import */ var _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delayed-dragover.directive */ "MR6/");




class DelayedDragoverModule {
}
DelayedDragoverModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: DelayedDragoverModule });
DelayedDragoverModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function DelayedDragoverModule_Factory(t) { return new (t || DelayedDragoverModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](DelayedDragoverModule, { declarations: [_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverComponent"], _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverDirective"]], exports: [_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverComponent"], _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverDirective"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DelayedDragoverModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverComponent"], _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverDirective"]],
                imports: [],
                exports: [_delayed_dragover_component__WEBPACK_IMPORTED_MODULE_1__["DelayedDragoverComponent"], _delayed_dragover_directive__WEBPACK_IMPORTED_MODULE_2__["DelayedDragoverDirective"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map