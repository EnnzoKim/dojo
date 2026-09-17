# Todo List

- **Category**: ui
- **Date**: 2026-09-17

## Problem

Build a small todo list component in React. The starter markup has a title, a text
input with a Submit button, and a list where each task shows its text and a Delete
button.

- Typing in the input and clicking Submit adds a new task to the end of the list.
- The input is cleared after a task is added.
- Clicking a task's Delete button removes that task only.

## Approach

- 입력값은 `curText` state로 관리하고 input에 `value` + `onChange`를 연결해
  controlled input으로 만든다. 추가 후 `setCurText('')`로 입력창을 비운다.
- 할 일은 `{ id, todo }` 객체 배열로 저장한다. `id`는 컴포넌트 밖의 카운터를 올려
  겹치지 않게 만든다.
- 추가는 `[...todos, newTodo]`, 삭제는 `todos.filter(...)`로 새 배열을 만들어 setter에
  넘긴다. 원본 배열은 건드리지 않는다.
- 렌더링은 `todos.map`으로 `<li>`를 만들고 `id`를 key로 쓴다.

Time O(n) per add/delete (배열 복사), space O(n).

## Retrospective

**막힌 지점**

1. JSX 안에서 `forEach`로 목록을 그리려 했다. `forEach`는 항상 `undefined`를
   반환하므로 화면에 그릴 값이 필요할 때는 결과를 배열로 모으는 `map`을 쓴다.
2. 화살표 함수 본문을 `{ }`로 감싸고 `return`을 빠뜨렸다. 중괄호 본문은 명시적
   `return`이 필요하고, 값 하나만 반환할 때는 `( )`나 중괄호 없는 형태를 쓴다.
3. 입력 핸들러에서 이벤트 객체 전체를 state에 넣었다. 필요한 것은 `e.target.value`
   이고, 이벤트는 값을 꺼내는 통로일 뿐이다.
4. state를 비워도 입력창이 안 비워질 수 있다. input이 state를 `value`로 읽지 않으면
   브라우저가 값을 따로 들고 있으므로, 화면 값을 state로 제어하려면 controlled
   input으로 만든다.
5. 목록 항목을 문자열로만 저장하면 삭제 대상을 구분할 수 없다. 텍스트는 중복될 수
   있고 인덱스는 key로 불안정하니 고유 `id`를 가진 객체로 저장한다. 데이터 모양을
   바꾸면 JSX에서 객체를 통째로 렌더링하던 곳(`{item}`)도 필드 접근으로 바꿔야 한다.

**다시 볼 것**

- React state는 불변 업데이트: 추가는 스프레드, 삭제는 `filter`, 수정은 `map` + 객체 스프레드.
- `Objects are not valid as a React child` 오류가 뜻하는 것.
- React state에 `Map`/`Set`보다 일반 배열·객체가 편한 이유.
- 함수형 업데이트 `setState((prev) => ...)`가 필요한 상황.

## Follow-ups

- [ ] 빈 문자열이나 공백만 입력하면 추가하지 않기.
- [ ] 시작할 때 기본 할 일 세 개를 보여주기.
- [ ] 함수형 업데이트로 `setTodos` 바꾸기.
- [ ] `filter` 콜백의 `e`, 필드명 `todo.todo`를 읽기 쉬운 이름으로 바꾸기.
- [ ] 접근성: input에 label 추가, form submit으로 Enter 키 지원.
