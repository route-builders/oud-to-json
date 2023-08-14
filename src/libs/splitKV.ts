const KV_REGEX = /^([a-zA-Z0-9_]+)=(.*)$/;

export const splitKV = (line: string): { key: string; value: string } | null => {
  const keyValueMatcher = line.match(KV_REGEX);
  if (keyValueMatcher === null || keyValueMatcher.length < 2) return null;

  const key = keyValueMatcher[1] as string;
  const value = (keyValueMatcher[2] ?? '').trimEnd();

  return { key, value };
};
