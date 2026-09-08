/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  let answer = '';

  for (let i = 0; i <= args.length; i++) {
    const cur = args[i];
    if (!cur) continue;

    switch (typeof cur) {
      case 'string':
        answer += cur;
        answer += ' ';

        break;
      case 'object':
        if (Array.isArray(cur)) {
          answer += classNames(...cur);
          answer += ' ';
        } else {
          for (const key in cur) {
            if (cur[key]) {
              answer += classNames(key);
              answer += ' ';
            }
          }
        }
        break;
      default:
        answer += cur;
    }
  }

  return answer.trim();
}
