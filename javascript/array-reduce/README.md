# Array Reduce

- **Category**: javascript
- **Date**: 2026-09-06

## Problem

Implement `Array.prototype.reduce` as `Array.prototype.myReduce` so the built-in one is
not overwritten.

`reduce` walks the array in order, calling a reducer callback on each element and
passing along the return value from the previous call. The final return value of the
last call is the result.

### Arguments

- `callbackFn(accumulator, currentValue, currentIndex, array)`: the reducer
- `initialValue` (optional): the starting accumulator

### Returns

The single value produced by running the reducer across all elements.

### Examples

```js
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
[1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
```

### Notes

There are nuances in what happens when `initialValue` is omitted, when the array is
empty, and when the array has holes. Check the MDN spec for `Array.prototype.reduce`
before starting. The test file covers these cases.

## Approach

- 누적값 `acc`와 순회 시작점을 정하는 `k`를 준비 단계에서 정한다.
- 초기값이 있으면(`arguments.length >= 2`) `acc = initialValue`, `k = -1`.
- 초기값이 없으면 `k in this`가 참인 첫 index를 찾아 `acc = this[k]`. 끝까지 없으면
  `TypeError`. 빈 배열과 전부 구멍인 배열이 여기서 같이 처리된다.
- for문은 `k + 1`부터 돌며, 구멍(`!(i in this)`)은 `continue`로 건너뛰고
  `callbackFn(acc, this[i], i, this)`의 반환값을 `acc`에 다시 넣는다.

Time O(n), space O(1).

## Retrospective

**막힌 지점**

1. for문 안에서 `callbackFn`을 부르는 걸 "재귀"라고 생각했다. 함수가 자기 자신을
   부르는 게 재귀이고, 이건 그냥 반복이다.
2. "초기값이 없다"를 `initialValue === undefined`로 판단하려 했다. `myReduce(fn)`과
   `myReduce(fn, undefined)`는 둘 다 `initialValue`가 `undefined`라 구분이 안 된다.
   `arguments.length`로 실제 넘어온 인자 개수를 봐야 한다. 화살표 함수엔 `arguments`가
   없으므로 `function`으로 정의해야 한다.
3. 빈 배열 에러 조건을 "초기값 없음 **또는** 빈 배열"로 잡았다. 둘 중 하나만 없으면
   시작할 값이 있으므로 에러가 아니다. 둘 **다** 없을 때만 `TypeError`.
4. 구멍이 있는 배열 `[1, , 3]`을 `this[i] === undefined`로 거르려 했다.
   `[1, undefined, 3]`과 구분이 안 된다. `i in this`로 키 존재 여부를 봐야 한다.
5. 배열이 전부 구멍이면 `this.length === 0` 검사로는 못 잡는다. 초기값이 없을 때
   "값이 있는 첫 index"를 찾는 while문이 빈 배열까지 자연스럽게 흡수한다.
6. 초기값이 없을 때 `acc = 0`으로 시작해서 GFE 테스트를 통과했지만 우연이었다.
   덧셈은 `0`에서 시작해도 결과가 같을 뿐, `['b','c','d']`는 `'0bcd'`, 곱셈은 `0`이
   나온다. 첫 요소를 `acc`로 삼고 그 다음부터 순회해야 한다.
7. 두 분기가 같은 for문(`i = k + 1`)을 쓰는데 초기값 있는 분기에서 `k`를 안 정해서
   `undefined + 1 = NaN`이 되어 반복이 한 번도 안 돌았다. `k = -1`로 해결.

**다시 볼 것**

- `arguments` 객체와 화살표 함수의 차이.
- falsy 값 6개. `0`, `''`를 `||`나 `!`로 검사하면 안 되는 이유.
- sparse array와 `in` 연산자, `hasOwnProperty`.
- 테스트가 통과해도 우연일 수 있다. 다른 연산(곱셈, 문자열)으로 한 번 더 확인하기.

## Follow-ups

- [ ] `Array.prototype.myReduceRight` 구현.
