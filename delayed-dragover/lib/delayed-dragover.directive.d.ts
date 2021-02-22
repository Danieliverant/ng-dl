import { ElementRef, EventEmitter, OnInit } from '@angular/core';
/**
 * Delays the dragover event.
 */
export declare class DelayedDragoverDirective implements OnInit {
    private readonly element;
    static ngAcceptInputType_paypoDragOver: string;
    set class(value: string);
    get class(): string;
    private _class;
    delay: number;
    /**
     * Delay before the dlDragoverDelay.
     * Useful for letting the user change his mind after the first delay -
     * i.e. hovering over paginator -> page number changes color -> page changes.
     */
    delayStep: number;
    dragoverDelayed: EventEmitter<any>;
    /**
     * Emits if dlDragoverDelayStep is in use.
     * Useful for letting the user change his mind after the first delay -
     * i.e. hovering over paginator -> (preDragoverDelayed emits) page number changes color -> page changes.
     */
    preDragoverDelayed: EventEmitter<any>;
    private dragoverCounter;
    constructor(element: ElementRef<HTMLElement>);
    ngOnInit(): void;
}
