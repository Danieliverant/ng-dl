import { Subject } from 'rxjs';

/**
 * Extract props from component.
 *
 * i.e.:
 *
 * ```
 * @Component({ ....} )
 * class MyComponent { @Input id: string; }
 *
 * const inputs: ComponentProps<MyComponent> = {
 *   id: 1, // error
 *   name: 'NgDl' // error
 * }
 *
 * const inputs: ComponentProps<MyComponent> = { id: '1' } // pass.
 * ```
 */
export type ComponentProps<Component extends object, Props = ExcludeFunctions<Component>> = {
  [Key in keyof Props]: Props[Key]
};
type MarkFunctionPropertyNames<Component> = {
  [Key in keyof Component]: Component[Key] extends () => unknown | Subject<any> ? never : Key;
};
type ExcludeFunctionPropertyNames<T extends object> = MarkFunctionPropertyNames<T>[keyof T];
type ExcludeFunctions<T extends object> = Pick<T, ExcludeFunctionPropertyNames<T>>;
