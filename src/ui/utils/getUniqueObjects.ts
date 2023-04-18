export const getUniqueObjects = <T>(data: T[]) =>
  [...new Set(data.map((item) => JSON.stringify(item)))].map(
    (item) => JSON.parse(item) as T
  );
