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

- `...args`로 인자를 배열로 모으고 for문으로 하나씩 본다. falsy 값은 `if (!cur) continue`로
  타입 검사 전에 한 번에 거른다.
- `typeof`로 분기한다. 문자열은 그대로 붙이고, `"object"`는 `Array.isArray`로 배열과 일반
  객체를 다시 나눈다.
- 배열은 원소가 "다시 인자"이므로 `classNames(...cur)`로 펼쳐서 재귀 호출한다. 재귀 호출
  안의 for문이 원소 사이 공백을 처리하고, 완성된 문자열 하나가 돌아온다.
- 일반 객체는 `for...in`으로 키를 돌며 값이 truthy인 키만 붙인다. 값은 조건으로만 쓴다.
- 붙일 때마다 뒤에 공백을 하나 넣고, 마지막에 `trim()`으로 끝 공백을 없앤다.

Time O(n) (n = 모든 depth의 원소 수), space O(d) (d = 배열 중첩 깊이, 재귀 스택).

## Retrospective

**막힌 지점**

1. 이미 `typeof`를 적용해 변수에 담아 놓고 `switch`에서 또 `typeof`를 썼다. 변수가
   지금 무슨 값을 들고 있는지 먼저 확인하기. 변환된 값에 같은 변환을 다시 걸면 항상
   같은 결과가 나와서 분기가 죽는다.
2. `switch`에 `break`를 빼먹어 아래 `case`로 흘러내렸는데, 문자열도 이터러블이라
   `for...of`가 글자 단위로 조용히 돌았다. 에러가 안 난다고 의도대로 도는 건 아니다.
3. 일반 객체를 `for...of`로 돌 수 있다고 생각했다. `for...of`는 `Symbol.iterator`가
   있는 것만 받고 `{}`는 아니다. 문자열과 배열만 넣어 봐서 못 잡았을 뿐이다. 테스트에
   없는 타입은 검증된 게 아니다.
4. 모든 타입마다 `case`를 만들어야 한다고 생각했다. 결과에 영향을 주는 타입만 나누고
   나머지는 `default`나 `!value` 같은 한 줄로 묶는다. `typeof`는 `null`, 배열, 일반
   객체를 전부 `"object"`로 주므로 그 안에서 `Array.isArray`로 한 번 더 나눠야 한다.
5. 재귀를 쓰면 반복문이 필요 없다고 생각했다. 반복문은 같은 층을 옆으로, 재귀는 아래
   층으로 내려가는 역할이라 둘 다 필요하다. 누적값을 인자로 넘길 필요도 없고, 재귀의
   반환값을 받아 붙이면 된다.
6. 배열 원소를 하나씩 재귀 호출했더니 결과가 공백 없이 붙었다. 호출마다 지역 변수가
   새로 만들어지므로 매 호출이 "첫 번째 인자"가 되어 앞 공백이 안 붙는다. 배열 전체를
   `...`로 펼쳐 한 번에 넘기면 그 호출의 반복문이 위치 정보를 갖는다.
7. 정의 쪽 `...args`는 인자를 배열로 모으고, 호출 쪽 `...arr`은 배열을 인자로 펼친다.
   기호는 같지만 방향이 반대다. 호출 쪽 스프레드는 이터러블만 되고 일반 객체는 `{...}`
   안에서만 된다.
8. `answer.trim()`만 호출하고 결과를 안 받았다. 문자열은 불변이라 메서드가 새 문자열을
   반환한다. 배열의 `push`, `sort`와 달리 원본이 안 바뀐다.

**다시 볼 것**

- `typeof`의 반환값 목록. `null`과 배열이 `"object"`인 이유, `Array.isArray`.
- 이터러블 프로토콜. `for...in`과 `for...of`의 차이, 어떤 값이 이터러블인지.
- `switch` fallthrough. `break` 없는 `case`의 동작.
- rest parameter와 spread의 방향 차이.
- 재귀에서 호출 프레임마다 지역 변수가 분리된다는 것. 위치 의존 로직을 재귀로 쪼갤 때 주의.
- 문자열 불변성. 반환값을 써야 하는 메서드와 원본을 바꾸는 메서드 구분.

## Follow-ups

- [ ] `i <= args.length`는 한 칸 더 읽는다. `!cur`가 가려 주고 있을 뿐이니 `<`로 고치기.
- [ ] 중간 배열이 빈 결과를 낼 때 공백이 두 번 생긴다. `classNames('a', [null], 'd')` →
      `'a  d'`. `trim`은 가운데를 못 잡는다.
- [ ] `default` 분기(숫자 등)는 뒤에 공백을 안 붙인다. `classNames('a', 42, 'b')` → `'a 42b'`.
- [ ] 배열에 모았다가 `join(' ')`으로 끝내는 버전으로 다시 풀어 보기. 공백 처리가 사라진다.
