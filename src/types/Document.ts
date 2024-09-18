type MetaField = {
  entry: number;
  last: number;
};
export type Document = {
  [key: string]: string | string[] | Document | Document[] | MetaField;
};
