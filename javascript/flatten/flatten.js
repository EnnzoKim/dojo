/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  let answer = [];

  for (let i = 0; i < value.length; i++) {
    const cur = value[i];

    if (Array.isArray(cur)) {
      answer.push(...flatten(cur));
    } else {
      answer.push(cur);
    }
  }

  return answer;
}
