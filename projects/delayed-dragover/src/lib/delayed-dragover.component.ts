import { Component } from '@angular/core';

const DEFAULT_TEXT = 'Hover Me';

@Component({
  selector: 'dl-delayed-dragover',
  template: `
    <h3>Dragover for 1 second</h3>
    <div dlDelayedDragover (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>
    <h3>Dragover for 2 seconds see the pre-delayed and another second for the delay</h3>
    <div dlDelayedDragover [dlDragoverDelayStep]="2000" (preDragoverDelayed)="changePreText()"
         (dragoverDelayed)="changeText()" (dragleave)="resetText()">{{ text }}</div>

  `
})
export class DelayedDragoverComponent {
  text = DEFAULT_TEXT;

  changeText(): void {
    this.text += ' - Hovered With Delay!';
  }

  changePreText(): void {
    this.resetText();
    this.text += ' - Hovered With Pre Delay!';
  }

  resetText(): void {
    this.text = DEFAULT_TEXT;
  }
}
