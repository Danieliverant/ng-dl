import { Component } from '@angular/core';
const DEFAULT_TEXT = 'Hover Me';
export class DelayedDragoverComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXllZC1kcmFnb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdHJhdmlzL2J1aWxkL0RhbmllbGl2ZXJhbnQvbmctZGwvcHJvamVjdHMvZGVsYXllZC1kcmFnb3Zlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGVsYXllZC1kcmFnb3Zlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7QUFZaEMsTUFBTSxPQUFPLHdCQUF3QjtJQVZyQztRQVdFLFNBQUksR0FBRyxZQUFZLENBQUM7SUFjdEIsQ0FBQztJQVpDLFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxJQUFJLHdCQUF3QixDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLElBQUksNEJBQTRCLENBQUM7SUFDNUMsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztJQUMzQixDQUFDOzs7WUF4QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1RFWFQgPSAnSG92ZXIgTWUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkbC1kZWxheWVkLWRyYWdvdmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDM+RHJhZ292ZXIgZm9yIDEgc2Vjb25kPC9oMz5cbiAgICA8ZGl2IGRsRGVsYXllZERyYWdvdmVyIChkcmFnb3ZlckRlbGF5ZWQpPVwiY2hhbmdlVGV4dCgpXCIgKGRyYWdsZWF2ZSk9XCJyZXNldFRleHQoKVwiPnt7IHRleHQgfX08L2Rpdj5cbiAgICA8aDM+RHJhZ292ZXIgZm9yIDIgc2Vjb25kcyBzZWUgdGhlIHByZS1kZWxheWVkIGFuZCBhbm90aGVyIHNlY29uZCBmb3IgdGhlIGRlbGF5PC9oMz5cbiAgICA8ZGl2IGRsRGVsYXllZERyYWdvdmVyIFtkbERyYWdvdmVyRGVsYXlTdGVwXT1cIjIwMDBcIiAocHJlRHJhZ292ZXJEZWxheWVkKT1cImNoYW5nZVByZVRleHQoKVwiXG4gICAgICAgICAoZHJhZ292ZXJEZWxheWVkKT1cImNoYW5nZVRleHQoKVwiIChkcmFnbGVhdmUpPVwicmVzZXRUZXh0KClcIj57eyB0ZXh0IH19PC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgRGVsYXllZERyYWdvdmVyQ29tcG9uZW50IHtcbiAgdGV4dCA9IERFRkFVTFRfVEVYVDtcblxuICBjaGFuZ2VUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMudGV4dCArPSAnIC0gSG92ZXJlZCBXaXRoIERlbGF5ISc7XG4gIH1cblxuICBjaGFuZ2VQcmVUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMucmVzZXRUZXh0KCk7XG4gICAgdGhpcy50ZXh0ICs9ICcgLSBIb3ZlcmVkIFdpdGggUHJlIERlbGF5ISc7XG4gIH1cblxuICByZXNldFRleHQoKTogdm9pZCB7XG4gICAgdGhpcy50ZXh0ID0gREVGQVVMVF9URVhUO1xuICB9XG59XG4iXX0=