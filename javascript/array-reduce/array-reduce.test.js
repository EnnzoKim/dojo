import './array-reduce';

const add = (prev, curr) => prev + curr;

describe('Array.prototype.myReduce', () => {
  test('add numbers', () => {
    expect([-4, 10].myReduce(add, 0)).toEqual(6);
  });

  test('add strings', () => {
    expect(['b', 'c', 'd'].myReduce(add, '')).toEqual('bcd');
  });

  // 문제 예시
  test('examples from the problem', () => {
    expect([1, 2, 3].myReduce(add, 0)).toEqual(6);
    expect([1, 2, 3].myReduce(add, 4)).toEqual(10);
  });

  // 아래는 MDN 명세의 세부 동작
  describe('without initialValue', () => {
    test('uses the first element as the initial accumulator', () => {
      expect([1, 2, 3].myReduce(add)).toEqual(6);
    });

    test('starts the callback from index 1', () => {
      const indices = [];
      [10, 20, 30].myReduce((acc, curr, index) => {
        indices.push(index);
        return acc;
      });
      expect(indices).toEqual([1, 2]);
    });

    test('returns the only element without calling the callback', () => {
      const fn = vi.fn(add);
      expect([7].myReduce(fn)).toEqual(7);
      expect(fn).not.toHaveBeenCalled();
    });

    test('throws TypeError on an empty array', () => {
      expect(() => [].myReduce(add)).toThrow(TypeError);
    });
  });

  describe('with initialValue', () => {
    test('returns initialValue on an empty array', () => {
      expect([].myReduce(add, 5)).toEqual(5);
    });

    test('starts the callback from index 0', () => {
      const indices = [];
      [10, 20].myReduce((acc, curr, index) => {
        indices.push(index);
        return acc;
      }, 0);
      expect(indices).toEqual([0, 1]);
    });

    test('treats undefined as a valid initialValue', () => {
      const fn = vi.fn((acc) => acc);
      [1, 2].myReduce(fn, undefined);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn.mock.calls[0][0]).toBeUndefined();
    });
  });

  test('passes (accumulator, currentValue, index, array) to the callback', () => {
    const arr = ['a', 'b'];
    const calls = [];
    arr.myReduce((acc, curr, index, array) => {
      calls.push([acc, curr, index, array]);
      return acc + curr;
    }, '');
    expect(calls).toEqual([
      ['', 'a', 0, arr],
      ['a', 'b', 1, arr],
    ]);
  });

  test('skips holes in sparse arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    const sparse = [1, , 3];
    const visited = [];
    sparse.myReduce((acc, curr) => {
      visited.push(curr);
      return acc;
    }, 0);
    expect(visited).toEqual([1, 3]);
  });

  test('does not modify the original array', () => {
    const arr = [1, 2, 3];
    arr.myReduce(add, 0);
    expect(arr).toEqual([1, 2, 3]);
  });
});
