import { isEmptyObject } from '../../src/libs/isEmptyObject';

describe('isEmptyObject', () => {
  test.each`
    input    | expected
    ${''}    | ${false}
    ${'abc'} | ${false}
    ${0}     | ${false}
    ${1}     | ${false}
    ${[]}    | ${false}
    ${{}}    | ${true}
  `('$input を受け取った場合、$expected を返す', ({ input, expected }) => {
    expect(isEmptyObject(input)).toBe(expected);
  });
});
