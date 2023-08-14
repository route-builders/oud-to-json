import { isValidOudTextContent } from '../../src/libs/isValidOudTextContent';

describe('isValidOudTextContent', () => {
  test('正しい形式のテキストの場合、true を返す', () => {
    const input = ['FileType=foobar', 'SomeText...', 'FileTypeAppComment=foobar'];
    expect(isValidOudTextContent(input)).toBe(true);
  });
  test('正しい形式に余分な空行を含む場合、false を返す', () => {
    const input = ['', 'FileType=foobar', '', 'FileTypeAppComment=foobar', ''];
    expect(isValidOudTextContent(input)).toBe(false);
  });
  test('FileTypeキーがvalueを持たない場合、false を返す', () => {
    const input = ['FileType', 'FileTypeAppComment=foobar'];
    expect(isValidOudTextContent(input)).toBe(false);
  });
  test('FileTypeAppCommentキーがvalueを持たない場合、false を返す', () => {
    const input = ['FileType=foobar', 'FileTypeAppComment'];
    expect(isValidOudTextContent(input)).toBe(false);
  });
});
