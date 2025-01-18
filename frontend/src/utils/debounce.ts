export const debounce = async (fn: any, delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn);
    }, delay);
  });
};

export const debounceFetch = <T>(
  fn: () => Promise<T>,
  delay: number,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn().then(resolve).catch(reject); // Ensures errors are handled properly.
    }, delay);
  });
};
