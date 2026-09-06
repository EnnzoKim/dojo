# Debounce

- **Category**: javascript
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

1. 함수를 반환하는 함수에서, 상태를 어디에 둘지 몰랐다. 바깥 함수는 한 번만 실행되고
   반환된 안쪽 함수가 여러 번 호출된다. 상태는 그 사이(바깥 함수의 지역 변수)에 두면
   안쪽 함수가 계속 같은 변수를 참조한다. 이게 클로저다.
2. 타이머를 없애려고 변수에 `null`을 넣었다. 변수는 ID를 적어둔 메모일 뿐이고, 실제
   취소는 `clearTimeout(id)`를 불러야 한다.
3. 콜백을 `fn(...args)`로 부르면 `this`가 사라진다. `this`는 함수에 저장된 게 아니라
   호출 순간 "점 앞에 뭐가 있었냐"로 정해진다. 나중에 실행되는 콜백(타이머, 이벤트)은
   엔진이 호출하므로 `this`가 비어 있다. 화살표 함수로 바깥 `this`를 물려받거나
   변수에 담아둔 뒤 `fn.apply(thisArg, args)`로 넘긴다.

**다시 볼 것**

- 클로저: 함수가 자기가 만들어진 환경의 변수를 붙들고 있는 것.
- `this` 결정 규칙: 점 호출, 일반 호출, `call/apply/bind`, 화살표 함수.
- 비동기 콜백 안에서 `this`와 인자를 보존하는 패턴.

## Follow-ups

- [ ] Add `cancel()` to drop the pending invocation and `flush()` to run it now.
- [ ] Implement `throttle`.
