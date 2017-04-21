import defaultCompile from './compile';
import isTopicTypeValid from './is-topic-type-valid';

export const create = compile => (sub, pub) => (
  (!isTopicTypeValid(sub)) ? false
  : (!isTopicTypeValid(pub)) ? false
  : compile(sub).test(`${pub}.`)
);

export default create(defaultCompile);
