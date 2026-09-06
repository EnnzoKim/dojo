import FakeTimers from '@sinonjs/fake-timers';

import debounce from './debounce';

let clock;

describe('debounce', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('can be initialized', () => {
    const increment = debounce(() => {}, 50);
    expect(increment).toBeTruthy();
  });

  test('executes after duration', () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    clock.tick(20);
    expect(i).toBe(1);
  });

  // 문제 예시 2: t=0, t=50 호출 -> t=100엔 아직 0, t=150에 1
  test('resets the timer when called again before wait', () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 100);

    increment(); // t = 0
    clock.tick(50);
    increment(); // t = 50
    clock.tick(50); // t = 100
    expect(i).toBe(0);

    clock.tick(50); // t = 150
    expect(i).toBe(1);
  });

  test('uses the latest arguments', () => {
    const calls = [];
    const push = debounce((n) => {
      calls.push(n);
    }, 10);

    push(1);
    push(2);
    push(3);
    clock.tick(10);
    expect(calls).toEqual([3]);
  });

  test('preserves this from the most recent call', () => {
    const results = [];
    const obj = {
      value: 42,
      record: debounce(function () {
        results.push(this.value);
      }, 10),
    };

    obj.record();
    clock.tick(10);
    expect(results).toEqual([42]);
  });

  test('can be invoked again after firing', () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    increment();
    clock.tick(10);
    increment();
    clock.tick(10);
    expect(i).toBe(2);
  });
});
