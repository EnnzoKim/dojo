# Flatten

- **Category**: javascript
- **Date**: 2026-09-08

## Problem

Implement `flatten`, which takes an array and returns a **new** array with every nested
subarray concatenated into a single level, no matter how deep the nesting goes. The
original array must not be mutated.

The built-in `Array.prototype.flat(Infinity)` does this, so the point is to write it
yourself. A custom flatten is needed when you have to skip certain values, flatten object
trees, avoid recursion limits on deep input, or flatten lazily.

### Arguments

- `value`: an array whose elements can be values or arrays, nested to any depth

### Returns

A new array containing the same elements in order, with all array nesting removed.

### Examples

```js
flatten([1, 2, 3]); // [1, 2, 3]
flatten([1, [2, 3]]); // [1, 2, 3]
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
```

## Approach

## Retrospective

**막힌 지점**

1.

**다시 볼 것**

-

## Follow-ups

- [ ]
