/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let acc;
  let k;

  if (arguments.length >= 2) {
    acc = initialValue;
    k = -1;
  } else {
    k = 0;
    while (!(k in this) && k < this.length) k++;
    if (k >= this.length) throw new TypeError('Reduce of empty array with no initial value');
    acc = this[k];
  }

  for (let i = k + 1; i < this.length; i++) {
    if (!(i in this)) continue;
    const cur = this[i];
    acc = callbackFn(acc, cur, i, this);
  }

  return acc;
};
