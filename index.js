'use strict'

let ow, propType

function devPropType (predicateOrCallback) {
  return typeof predicateOrCallback === 'function'
    ? (props, propName, ...args) => {
      const predicate = predicateOrCallback(props, propName, ...args)
      const value = props[propName]
      try {
        ow(value, predicate)
      } catch (err) {
        return err
      }
    }
    : (props, propName) => {
      const value = props[propName]
      try {
        ow(value, predicateOrCallback)
      } catch (err) {
        return err
      }
    }
}

function productionPropType () {}

// copy+paste ow/dev-only.js because it does not seem to be published
if (process.env.NODE_ENV === 'production') {
  const shim = new Proxy(() => {}, {
    get: () => shim,
    apply: () => shim
  })

  ow = shim
  propType = productionPropType
} else {
  ow = require('ow')
  propType = devPropType
}

// exporting ow since it might be the shim
propType.ow = ow
propType.propType = propType

module.exports = propType
