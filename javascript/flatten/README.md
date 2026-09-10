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

- 결과를 담을 새 배열 `answer`를 만들고 입력을 앞에서부터 순회한다.
- 원소가 배열이면(`Array.isArray`) 재귀로 평탄화한 결과를 `push(...)`로 펼쳐 넣고,
  아니면 그대로 `push`한다.
- 반복문이 같은 층을 옆으로 훑고, 재귀가 한 층 아래로 내려간다. 입력은 읽기만 하므로
  변형되지 않는다.

Time O(n) (n = 모든 depth의 원소 수), space O(n + d) (결과 배열 + 재귀 스택 깊이 d).

## Retrospective

**막힌 지점**

1. 막힌 곳 없이 바로 풀었다. 직전 문제(class-names)에서 정리한 "배열은 원소가 다시
   인자이므로 재귀 + 스프레드로 넘긴다", "반복문은 옆으로, 재귀는 아래로"가 그대로
   적용됐다. 같은 구조의 문제를 연달아 풀면 패턴이 손에 붙는다.

**다시 볼 것**

- `push(...arr)`는 배열 원소를 인자로 펼치므로 원소가 수십만 개면 인자 개수 제한에
  걸릴 수 있다. `concat`이나 원소별 `push`가 안전한 이유.
- 재귀 깊이가 입력에 따라 무한정 커질 수 있을 때 스택으로 바꾸는 방법.
- 재할당하지 않는 변수는 `const`로 선언하기.

## Follow-ups

- [ ] 재귀 없이 스택으로 푸는 반복 버전.
- [ ] `depth` 인자를 받아 `Array.prototype.flat(depth)`처럼 동작하는 버전.
- [ ] 제너레이터로 지연 평탄화하는 버전.
