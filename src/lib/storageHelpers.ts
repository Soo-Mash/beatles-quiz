export const setItem = (key: string, value: any) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) => {
  const raw = sessionStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const clearAll = () => sessionStorage.clear();
