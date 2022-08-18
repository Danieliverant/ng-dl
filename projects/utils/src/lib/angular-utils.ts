import { ComponentProps } from './models/props';
import { ComponentRef, inject, Type, ViewContainerRef } from '@angular/core';

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
export function compileComponentToInnerHTMLFactory<T extends object>(
  component: Type<T>
): (inputs?: ComponentProps<T>) => string {
  const vcr = inject(ViewContainerRef);
  const instance = vcr.createComponent<T>(component);

  return (inputs?: ComponentProps<T>): string => {
    if (inputs) {
      setInputsToComponent(inputs, instance);
      instance.changeDetectorRef.detectChanges();
    }
    const innerHTML = (instance.hostView as any).rootNodes[0].innerHTML;
    instance.destroy();
    return innerHTML;
  };
}

function setInputsToComponent<T extends object>(
  inputs: ComponentProps<T>,
  instance: ComponentRef<T>
): void {
  Object.entries(inputs).forEach(([key, value]) => {
    instance.setInput(key, value);
  });
}
