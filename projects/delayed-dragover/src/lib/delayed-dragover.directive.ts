import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, fromEvent, merge, timer } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

const DEFAULT_DRAG_OVER_CLASS = 'drag-over';
const DEFAULT_DELAY = 1000;

/**
 * Delays the dragover event.
 */
@Directive({
  selector: '[dlDelayedDragover]'
})
export class DelayedDragoverDirective implements OnInit {
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_paypoDragOver: string;

  @Input('dlDelayedDragover')
  set class(value: string) {
    this._class = value || DEFAULT_DRAG_OVER_CLASS;
  }

  get class(): string {
    return this._class;
  }

  private _class: string;

  @Input('dlDragoverDelay') delay = DEFAULT_DELAY;
  /**
   * Delay in addition to the dlDragoverDelay.
   * Useful for letting the user change his mind before the default delay -
   * i.e. hovering over paginator -> page number changes color -> page changes.
   */
  @Input('dlDragoverDelayStep') delayStep = 0;
  @Output() dragoverDelayed = new EventEmitter();
  /**
   * Emits if dlDragoverDelayStep is in use.
   * Useful for letting the user change his mind before the default delay -
   * i.e. hovering over paginator -> (preDragoverDelayed emits) page number changes color -> page changes.
   */
  @Output() preDragoverDelayed = new EventEmitter();

  // using counter to fix these issues:
  // https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
  // https://stackoverflow.com/questions/14203734/dragend-dragenter-and-dragleave-firing-off-immediately-when-i-drag
  private dragoverCounter = 0;

  constructor(private readonly element: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    const hide$ = fromEvent(this.element.nativeElement, 'dragleave').pipe(tap(_ => this.dragoverCounter--));
    const show$ = fromEvent(this.element.nativeElement, 'dragenter').pipe(tap(_ => this.dragoverCounter++));

    merge(hide$, show$)
      .pipe(
        tap(() => this.element.nativeElement.classList.remove(this.class)),
        switchMap(_ => {
          if (this.dragoverCounter > 0) {
            return timer(this.delay).pipe(
              tap(() => this.element.nativeElement.classList.add(this.class)),
              tap(() => this.delayStep && this.preDragoverDelayed.emit()),
              delay(this.delayStep)
            );
          }
          return EMPTY;
        })
      )
      .subscribe(this.dragoverDelayed);
  }
}
