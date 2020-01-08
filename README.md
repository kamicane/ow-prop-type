# ow-prop-type

React prop-types validation with [ow](https://github.com/sindresorhus/ow)

1. when `process.env.NODE_ENV` is `'production'` it will be a shim function
2. it exports the `ow` object (or shim in `'production'`) as a property
3. will return the unprocessed `ArgumentError`

## Why

[prop-types](https://github.com/facebook/prop-types) has only very basic validation, and it is super verbose to add custom validators.

## Example

```js
import propType, { ow } from 'ow-prop-type'

class MyComponent extends React.Component {
  static propTypes = {
    // propType with a predicate
    total: propType(
      ow
        .number
        .integer
        .greaterThanOrEqual(0)
    ),
    // propType with a callback, must return a predicate
    current: propType((props) => {
      return ow
        .number
        .integer
        .greaterThanOrEqual(0)
        .lessThanOrEqual(props.total)
    }
  }
}
```
