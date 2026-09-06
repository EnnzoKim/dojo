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

1. 반복문 안에서 콜백을 부르는 걸 "재귀"라고 불렀다. 재귀는 함수가 자기 자신을 부르는
   것이다. 용어를 정확히 쓰기.
2. "인자를 안 넘겼다"를 `=== undefined`로 판단하려 했다. 안 넘긴 것과 `undefined`를
   넘긴 것은 값이 같아 구분이 안 된다. `arguments.length`로 개수를 봐야 하고,
   화살표 함수에는 `arguments`가 없다.
3. 에러 조건을 "A 또는 B"로 잡았는데 실제로는 "A 그리고 B"였다. 예외 조건은 "시작할
   값이 하나도 없는가"처럼 의미로 먼저 정리한 뒤 코드로 옮기기.
4. 배열의 구멍(hole)을 `=== undefined`로 거르려 했다. `undefined`가 값으로 들어간
   자리와 구분이 안 된다. `i in arr`로 키 존재 여부를 본다.
5. `length === 0` 검사만으로는 전부 구멍인 배열을 못 잡는다. "첫 유효 요소 찾기"를
   먼저 하면 빈 배열까지 한 번에 처리된다.
6. 초기값을 `0`으로 두고도 테스트가 통과해서 맞다고 생각했다. 덧셈이라 우연히 같았을
   뿐, 문자열이나 곱셈이면 틀린다. 테스트 통과가 정답의 증명은 아니다.
7. 두 분기가 같은 반복문을 공유하는데 한 분기에서 시작 index 변수를 안 정했다.
   `undefined + 1 = NaN`이라 반복이 안 돌았다. 공유 변수는 모든 분기에서 초기화하기.

**다시 볼 것**

- `arguments` 객체, 인자 생략과 `undefined` 전달의 차이.
- falsy 값 6개. `0`, `''`를 `||`나 `!`로 검사하면 안 되는 이유.
- sparse array, `in` 연산자, `hasOwnProperty`.
- 테스트가 통과해도 다른 연산이나 타입으로 한 번 더 확인하기.

## Follow-ups

- [ ] `Array.prototype.myReduceRight` 구현.
