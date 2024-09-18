import { META_FIELD_KEYNAME } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isEmptyObject = (obj: any, ignoreMeta: boolean = false): boolean => {
  try {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return false;
    }
    const keys = Object.keys(obj);
    if (ignoreMeta) {
      return keys.length === 0 || (keys.length === 1 && keys[0] === META_FIELD_KEYNAME);
    }
    return keys.length === 0;
  } catch (error) {
    console.warn(error);
    return false;
  }
};
