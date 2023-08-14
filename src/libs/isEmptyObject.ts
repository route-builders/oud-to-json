// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isEmptyObject = (obj: any): boolean => {
  try {
    return Object.keys(obj).length === 0;
  } catch (error) {
    console.warn(error);
    return false;
  }
};
