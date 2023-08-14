import { splitKV } from '../../src/libs/splitKV';
describe('splitKV', () => {
  test.each`
    line         | expected
    ${''}        | ${null}
    ${'Foo.'}    | ${null}
    ${'='}       | ${null}
    ${'=bar'}    | ${null}
    ${'Foo=bar'} | ${{ key: 'Foo', value: 'bar' }}
  `('`$line` を受け取った場合に $expected を返す', ({ line, expected }) => {
    expect(splitKV(line)).toStrictEqual(expected);
  });
});
