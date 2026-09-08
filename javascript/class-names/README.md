# Class Names

- **Category**: javascript
- **Date**: 2026-09-07

## Problem

Implement `classNames`, a utility that conditionally joins CSS class names into a single
space-separated string. Libraries like `classnames` and `clsx` do the same job in React
apps.

### Arguments

Any number of arguments. Each one can be:

- a string: added as-is
- an object: each key is added when its value is truthy
- an array: flattened recursively, each element following the rules above
- anything falsy (`null`, `undefined`, `false`, `''`, `0`): ignored

### Returns

A string with the collected class names joined by a single space. No leading or
trailing whitespace.

### Examples

```js
classNames('foo', 'bar'); // 'foo bar'
classNames('foo', { bar: true }); // 'foo bar'
classNames({ 'foo-bar': true }); // 'foo-bar'
classNames({ 'foo-bar': false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
classNames('a', ['b', { c: true, d: false }]); // 'a b c'
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // 'foo bar baz quux'
classNames(null, false, 'bar', undefined, { baz: null }, ''); // 'bar'
```

## Approach

## Retrospective

**막힌 지점**

1.

**다시 볼 것**

-

## Follow-ups

- [ ]
