import flatten from './flatten';

describe('flatten array', () => {
  test('empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  test('nested array', () => {
    expect(flatten([1, [2]])).toEqual([1, 2]);
  });

  test('multiple levels of nesting', () => {
    expect(flatten([1, [2, [3]]])).toEqual([1, 2, 3]);
  });

  // 문제 예시
  describe('examples from the problem', () => {
    test('single-level array is unaffected', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('inner arrays are flattened into a single level', () => {
      expect(flatten([1, [2, 3]])).toEqual([1, 2, 3]);
      expect(
        flatten([
          [1, 2],
          [3, 4],
        ]),
      ).toEqual([1, 2, 3, 4]);
    });

    test('flattens recursively', () => {
      expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  test('empty nested arrays disappear', () => {
    expect(flatten([[], [[]], [1, [], [2]]])).toEqual([1, 2]);
  });

  test('keeps non-array values as-is', () => {
    const obj = { a: 1 };
    expect(flatten([obj, ['x', [null, undefined, 0]]])).toEqual([obj, 'x', null, undefined, 0]);
  });

  test('returns a new array and does not mutate the input', () => {
    const input = [1, [2, [3]]];
    const inner = input[1];
    const result = flatten(input);
    expect(result).not.toBe(input);
    expect(input).toEqual([1, [2, [3]]]);
    expect(input[1]).toBe(inner);
  });
});
