import classNames from './class-names';

describe('classNames', () => {
  test('empty values', () => {
    expect(classNames([])).toEqual('');
  });

  test('single value', () => {
    expect(classNames('foo')).toEqual('foo');
  });

  test('two values', () => {
    expect(classNames('foo', 'bar')).toEqual('foo bar');
  });

  test('array values', () => {
    expect(classNames(['foo', 'bar', 'baz'])).toEqual('foo bar baz');
  });

  // 문제 예시
  describe('examples from the problem', () => {
    test('strings', () => {
      expect(classNames('foo', 'bar')).toEqual('foo bar');
    });

    test('string and object', () => {
      expect(classNames('foo', { bar: true })).toEqual('foo bar');
    });

    test('object with truthy value', () => {
      expect(classNames({ 'foo-bar': true })).toEqual('foo-bar');
    });

    test('object with falsy value', () => {
      expect(classNames({ 'foo-bar': false })).toEqual('');
    });

    test('multiple objects', () => {
      expect(classNames({ foo: true }, { bar: true })).toEqual('foo bar');
    });

    test('object with multiple keys', () => {
      expect(classNames({ foo: true, bar: true })).toEqual('foo bar');
      expect(classNames({ foo: true, bar: false, qux: true })).toEqual('foo qux');
    });

    test('nested arrays are flattened recursively', () => {
      expect(classNames('a', ['b', { c: true, d: false }])).toEqual('a b c');
      expect(classNames('a', ['b', ['c', ['d', { e: true }]]])).toEqual('a b c d e');
    });

    test('mixed values', () => {
      expect(classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })).toEqual(
        'foo bar baz quux',
      );
    });

    test('falsy values are ignored', () => {
      expect(classNames(null, false, 'bar', undefined, { baz: null }, '')).toEqual('bar');
      expect(classNames(0, NaN, [null, false, [undefined]])).toEqual('');
    });

    test('no leading or trailing whitespace', () => {
      const result = classNames('foo', { bar: true }, ['baz']);
      expect(result).toEqual(result.trim());
      expect(classNames()).toEqual('');
    });
  });
});
