import { splitKV } from './splitKV';

const OBJECT_ENTRYPOINT_REGEX = /^([a-zA-Z0-9_]+)\.$/;
const OBJECT_FINISHPOINT_REGEX = /^\.$/;

export const isValidOudTextContent = (sources: string[]): boolean => {
  if (sources.length < 2) return false;

  const line0KV = splitKV(sources[0] as string);
  const lineLastKV = splitKV(sources[sources.length - 1] as string);

  const entrypointCount = sources.filter((v) => OBJECT_ENTRYPOINT_REGEX.test(v)).length;
  const finishpointCount = sources.filter((v) => OBJECT_FINISHPOINT_REGEX.test(v)).length;

  return (
    // ファイル先頭と末尾のキー名をチェック
    (line0KV &&
      line0KV.key === 'FileType' &&
      lineLastKV &&
      lineLastKV.key === 'FileTypeAppComment' &&
      // ディレクティブの開始部と終了部が同数かチェック
      entrypointCount === finishpointCount) ??
    false
  );
};
