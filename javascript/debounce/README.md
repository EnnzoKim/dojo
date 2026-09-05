# Debounce

- **Category**: javascript
- **Difficulty**: Medium
- **Source**: https://www.greatfrontend.com/questions/javascript/debounce
- **Date**: 2026-09-05

## Problem

Implement `debounce(func, wait)`.

The returned function delays calling `func` until `wait` ms have passed since the
**most recent** call. It never invokes `func` immediately. When the delayed call
finally runs, it uses the latest arguments and preserves the `this` of the most
recent call.

Elevator analogy: the door closes only after some time passes without anyone
pressing "Door open".

### Arguments

- `func` (Function): the callback to debounce
- `wait` (number): milliseconds to wait after the latest call

### Returns

- (Function): the debounced function

### Examples

```js
let i = 0;
const debouncedIncrement = debounce(() => i++, 100);

debouncedIncrement(); // t = 0,   i = 0
// t = 50: still 0
// t = 100: i = 1
```

```js
debouncedIncrement(); // t = 0
debouncedIncrement(); // t = 50, timer reset
// t = 100: still 0 (only 50ms since last call)
// t = 150: i = 1
```

## Approach

- Keep a single pending timer id in closure state.
- On every call: clear the previous timer, then schedule a new one with the
  current `this` and `args`.
- Invoke with `func.apply(this, args)` so receiver and arguments come from the
  latest call.
- Use a regular `function` (not an arrow) for the wrapper so `this` is bound
  dynamically at call time.

Time O(1) per call, space O(1).

## Notes

- Tests use `@sinonjs/fake-timers` (same as GreatFrontEnd) so their test files
  can be pasted as-is.

## Follow-ups

- [ ] Add `cancel()` to drop the pending invocation and `flush()` to run it now.
- [ ] Implement `throttle`.
