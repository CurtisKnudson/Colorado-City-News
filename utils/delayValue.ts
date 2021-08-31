export function delayValue<T>(time: number, value: T) {
  return new Promise<T>((resolve) => {
    window.setTimeout(resolve, time, value);
  });
}

export function delayWithValue<T>(value: T, delay?: number) {
  const time = Math.round(Math.random());
  return delayValue(delay || time, value);
}
