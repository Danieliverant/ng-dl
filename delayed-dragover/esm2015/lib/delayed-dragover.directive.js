import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY, fromEvent, merge, timer } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
const DEFAULT_DRAG_OVER_CLASS = 'drag-over';
const DEFAULT_DELAY = 1000;
/**
 * Delays the dragover event.
 */
export class DelayedDragoverDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXllZC1kcmFnb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdHJhdmlzL2J1aWxkL0RhbmllbGl2ZXJhbnQvbmctZGwvcHJvamVjdHMvZGVsYXllZC1kcmFnb3Zlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGVsYXllZC1kcmFnb3Zlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RCxNQUFNLHVCQUF1QixHQUFHLFdBQVcsQ0FBQztBQUM1QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFFM0I7O0dBRUc7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBbUNuQyxZQUE2QixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQXBCbkMsVUFBSyxHQUFHLGFBQWEsQ0FBQztRQUNoRDs7OztXQUlHO1FBQzJCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DOzs7O1dBSUc7UUFDTyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxELHFDQUFxQztRQUNyQyxrR0FBa0c7UUFDbEcsa0hBQWtIO1FBQzFHLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRzVCLENBQUM7SUFoQ0QsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSx1QkFBdUIsQ0FBQztJQUNqRCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUEyQkQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEcsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7YUFDaEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNsRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDL0QsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLEVBQzNELEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ3RCLENBQUM7YUFDSDtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQTVERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjthQUNoQzs7O1lBWm1CLFVBQVU7OztvQkFpQjNCLEtBQUssU0FBQyxZQUFZO29CQVdsQixLQUFLLFNBQUMsaUJBQWlCO3dCQU12QixLQUFLLFNBQUMscUJBQXFCOzhCQUMzQixNQUFNO2lDQU1OLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgZnJvbUV2ZW50LCBtZXJnZSwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgREVGQVVMVF9EUkFHX09WRVJfQ0xBU1MgPSAnZHJhZy1vdmVyJztcbmNvbnN0IERFRkFVTFRfREVMQVkgPSAxMDAwO1xuXG4vKipcbiAqIERlbGF5cyB0aGUgZHJhZ292ZXIgZXZlbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkbERlbGF5ZWREcmFnb3Zlcl0nXG59KVxuZXhwb3J0IGNsYXNzIERlbGF5ZWREcmFnb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9wYXlwb0RyYWdPdmVyOiBzdHJpbmc7XG5cbiAgQElucHV0KCdkbERyYWdvdmVyJylcbiAgc2V0IGNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbGFzcyA9IHZhbHVlIHx8IERFRkFVTFRfRFJBR19PVkVSX0NMQVNTO1xuICB9XG5cbiAgZ2V0IGNsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2xhc3M6IHN0cmluZztcblxuICBASW5wdXQoJ2RsRHJhZ292ZXJEZWxheScpIGRlbGF5ID0gREVGQVVMVF9ERUxBWTtcbiAgLyoqXG4gICAqIERlbGF5IGJlZm9yZSB0aGUgZGxEcmFnb3ZlckRlbGF5LlxuICAgKiBVc2VmdWwgZm9yIGxldHRpbmcgdGhlIHVzZXIgY2hhbmdlIGhpcyBtaW5kIGFmdGVyIHRoZSBmaXJzdCBkZWxheSAtXG4gICAqIGkuZS4gaG92ZXJpbmcgb3ZlciBwYWdpbmF0b3IgLT4gcGFnZSBudW1iZXIgY2hhbmdlcyBjb2xvciAtPiBwYWdlIGNoYW5nZXMuXG4gICAqL1xuICBASW5wdXQoJ2RsRHJhZ292ZXJEZWxheVN0ZXAnKSBkZWxheVN0ZXAgPSAwO1xuICBAT3V0cHV0KCkgZHJhZ292ZXJEZWxheWVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKipcbiAgICogRW1pdHMgaWYgZGxEcmFnb3ZlckRlbGF5U3RlcCBpcyBpbiB1c2UuXG4gICAqIFVzZWZ1bCBmb3IgbGV0dGluZyB0aGUgdXNlciBjaGFuZ2UgaGlzIG1pbmQgYWZ0ZXIgdGhlIGZpcnN0IGRlbGF5IC1cbiAgICogaS5lLiBob3ZlcmluZyBvdmVyIHBhZ2luYXRvciAtPiAocHJlRHJhZ292ZXJEZWxheWVkIGVtaXRzKSBwYWdlIG51bWJlciBjaGFuZ2VzIGNvbG9yIC0+IHBhZ2UgY2hhbmdlcy5cbiAgICovXG4gIEBPdXRwdXQoKSBwcmVEcmFnb3ZlckRlbGF5ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gdXNpbmcgY291bnRlciB0byBmaXggdGhlc2UgaXNzdWVzOlxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MTEwMzUzL2h0bWw1LWRyYWdsZWF2ZS1maXJlZC13aGVuLWhvdmVyaW5nLWEtY2hpbGQtZWxlbWVudFxuICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDIwMzczNC9kcmFnZW5kLWRyYWdlbnRlci1hbmQtZHJhZ2xlYXZlLWZpcmluZy1vZmYtaW1tZWRpYXRlbHktd2hlbi1pLWRyYWdcbiAgcHJpdmF0ZSBkcmFnb3ZlckNvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGhpZGUkID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZHJhZ2xlYXZlJykucGlwZSh0YXAoXyA9PiB0aGlzLmRyYWdvdmVyQ291bnRlci0tKSk7XG4gICAgY29uc3Qgc2hvdyQgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkcmFnZW50ZXInKS5waXBlKHRhcChfID0+IHRoaXMuZHJhZ292ZXJDb3VudGVyKyspKTtcblxuICAgIG1lcmdlKGhpZGUkLCBzaG93JClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzKSksXG4gICAgICAgIHN3aXRjaE1hcChfID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kcmFnb3ZlckNvdW50ZXIgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGltZXIodGhpcy5kZWxheSkucGlwZShcbiAgICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzcykpLFxuICAgICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5kZWxheVN0ZXAgJiYgdGhpcy5wcmVEcmFnb3ZlckRlbGF5ZWQuZW1pdCgpKSxcbiAgICAgICAgICAgICAgZGVsYXkodGhpcy5kZWxheVN0ZXApXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuZHJhZ292ZXJEZWxheWVkKTtcbiAgfVxufVxuIl19