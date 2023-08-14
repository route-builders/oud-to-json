import { splitKV } from './splitKV';

export const isValidOudTextContent = (sources: string[]): boolean => {
  if (sources.length < 2) return false;

  const line0KV = splitKV(sources[0] as string);
  const lineLastKV = splitKV(sources[sources.length - 1] as string);

  return (line0KV && line0KV.key === 'FileType' && lineLastKV && lineLastKV.key === 'FileTypeAppComment') ?? false;
};
