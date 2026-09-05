/**
 * Debounce: 마지막 호출 후 wait ms 동안 추가 호출이 없을 때만 func 실행.
 * this와 인자는 마지막 호출 기준으로 전달된다.
 */
export default function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(this, args);
    }, wait);
  };
}
