// @flow
import memoize from 'memoizee';

import isTopicTypeValid from './is-topic-type-valid';
import compile from './compile';

export type CompileFn = (string) => RegExp;
export type MatcherFn = (string, string) => boolean;

export { compile };

export const createMatcher = (compiler: CompileFn = compile): MatcherFn =>
  (sub, pub) => (
    (!isTopicTypeValid(sub)) ? false
    : (!isTopicTypeValid(pub)) ? false
    : compiler(sub).test(`${pub}.`)
  );

export default createMatcher(memoize(compile, {
  primitive: true,
  max: 128,
}));
