// @flow
import defaultCompileFn from './compile';
import isTopicTypeValid from './is-topic-type-valid';

export type CompileFn = (string) => RegExp;
export type MatcherFn = (string, string) => boolean;

export const create = (compile: CompileFn): MatcherFn =>
  (sub, pub) => (
    (!isTopicTypeValid(sub)) ? false
    : (!isTopicTypeValid(pub)) ? false
    : compile(sub).test(`${pub}.`)
  );

export default create(defaultCompileFn);
