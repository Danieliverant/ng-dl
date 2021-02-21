import { NgModule } from '@angular/core';
import { DelayedDragoverComponent } from './delayed-dragover.component';
import { DelayedDragoverDirective } from './delayed-dragover.directive';

@NgModule({
  declarations: [DelayedDragoverComponent, DelayedDragoverDirective],
  imports: [],
  exports: [DelayedDragoverComponent, DelayedDragoverDirective]
})
export class DelayedDragoverModule {
}
