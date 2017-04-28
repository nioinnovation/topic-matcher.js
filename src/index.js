// @flow
import memoize from 'memoizee';

import isTopicTypeValid from './is-topic-type-valid';
import compile from './compile';

export type CompileFn = (string) => RegExp;
export type MatcherFn = (string, string) => boolean;

export { compile };

const defaultResolver = t => t;

export const createMatcher = (compiler: CompileFn = compile): MatcherFn =>
  (sub, pub, options = {}) => {
    const { resolver = defaultResolver } = options;
    return (!isTopicTypeValid(sub)) ? false
      : (!isTopicTypeValid(pub)) ? false
      : compiler(resolver(sub)).test(`${resolver(pub)}.`);
  };

export default createMatcher(memoize(compile, {
  primitive: true,
  max: 128,
}));
