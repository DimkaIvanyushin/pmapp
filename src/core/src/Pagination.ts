export function Pagination<T>(_data: T[]) {
  let data = [..._data];
  let page = 0;
  const count = 5;

  return () => ({
    nextPage: () => {
      page++;
      const end = page * count;

      console.log(end);
      return data.slice(0, Math.min(end, data.length));
    },
    setData: (_data: T[]) => {
      data = [..._data];
    },
  });
}
