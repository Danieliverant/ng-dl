import { ComponentProps } from './models/props';
import { ComponentRef, EmbeddedViewRef, inject, Type, ViewContainerRef } from '@angular/core';

/**
 * Used to extract innerHTML from Angular Component after rendering.
 *
 * i.e.:
 * ```
 * const innerHTMLFactory = compileComponentToInnerHTMLFactory(MyComponent);
 * const innerHTML = innerHTMLFactory({ name: 'NgDl' });
 * ```
 * @param component - component to extract innerHTML from.
 */
export function compileComponentToInnerHTMLFactory<C extends object>(
  component: Type<C>
): (inputs?: ComponentProps<C>) => string {
  const vcr = inject(ViewContainerRef);
  const componentRef = vcr.createComponent<C>(component);

  return (inputs?: ComponentProps<C>): string => {
    if (inputs) {
      setInputsToComponent(inputs, componentRef);
      componentRef.changeDetectorRef.detectChanges();
    }
    const innerHTML = (componentRef.hostView as EmbeddedViewRef<C>).rootNodes[0].innerHTML;
    componentRef.destroy();
    return innerHTML;
  };
}

function setInputsToComponent<C extends object>(
  inputs: ComponentProps<C>,
  componentRef: ComponentRef<C>
): void {
  Object.entries(inputs).forEach(([key, value]) => componentRef.setInput(key, value));
}
