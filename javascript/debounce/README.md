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

- `debounce` 안, 반환 함수 밖에 `timer` 변수를 둔다 (클로저).
- 반환 함수가 호출될 때마다 이전 타이머를 `clearTimeout`으로 취소하고 새로 예약한다.
- `setTimeout` 콜백을 화살표 함수로 써서 호출 시점의 `this`를 그대로 물려받고,
  `func.apply(this, args)`로 `this`와 인자를 함께 넘긴다.

Time O(1) per call, space O(1).

## Retrospective

**막힌 지점**

1. `setTimeout`을 써야 한다는 건 알았는데, 타이머 ID를 어디에 둘지 몰랐다.
   반환값으로 내보내야 하나 싶었는데, 반환하는 건 새 함수이고 ID는 클로저 변수에
   "기억"해두는 것이었다.
2. 함수는 호출될 때마다 변수가 초기화되는데 어떻게 이전 값을 기억하는지 헷갈렸다.
   `debounce`는 한 번만 실행되고, 여러 번 호출되는 건 반환된 안쪽 함수라는 걸
   구분하지 못했던 것. 안쪽 함수는 `timer`를 새로 만드는 게 아니라 바깥 것을
   참조할 뿐이다.
3. 타이머를 없애는 게 `timer = null`인 줄 알았다. 변수는 메모일 뿐이고 실제 취소는
   `clearTimeout(id)`를 불러야 한다.
4. `func(...args)`로 인자는 넘어가지만 `this`가 날아간다. `this`는 함수에 저장된 게
   아니라 "점 앞에 뭐가 있었냐"로 호출 순간 정해지고, `setTimeout` 콜백은 엔진이
   호출하므로 점 앞이 비어있다. 화살표 콜백 + `apply`로 해결.

**다시 볼 것**

- 클로저: 함수가 자기가 만들어진 환경의 변수를 붙들고 있는 것. 공장(`debounce`)과
  제품(반환 함수) 비유.
- `this` 결정 규칙 4가지: 점 호출, 일반 호출, `call/apply/bind`, 화살표 함수.

## Notes

- Tests use `@sinonjs/fake-timers` (same as GreatFrontEnd) so their test files
  can be pasted as-is.

## Follow-ups

- [ ] Add `cancel()` to drop the pending invocation and `flush()` to run it now.
- [ ] Implement `throttle`.
