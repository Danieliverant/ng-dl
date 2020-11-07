# Numeric Input Directive

Sync browsers' behavior and localization on numeric inputs.

## Installation

Install with [NPM](https://www.npmjs.com/get-npm):

```bash
npm i @ng-dl/numeric-input
```

## Usage

```ts
import { NumericInputModule } from '@ng-dl/numeric-input';

@NgModule({
  ...,
  imports: [..., NumericInputModule]
})
export class AppModule { }
```
Override default browser locale with any [supported locale](https://developer.chrome.com/webstore/i18n#localeTable).

```ts
import { NumericInputModule, NUMERIC_INPUT_LOCALE } from '@ng-dl/numeric-input';

@NgModule({
  ...,
  imports: [..., NumericInputModule],
  providers: [{ provide: NUMERIC_INPUT_LOCALE, useValue: 'custom-locale' }]
})
export class AppModule { }
```
Apply the directive:
```html
<input dlNumericInput/>
```

## Contributing
Pull requests are welcome. Suggestions are welcome.

For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/Danieliverant/ng-dl/blob/master/projects/numeric-input/LICENSE)