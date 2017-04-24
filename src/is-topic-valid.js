// @flow
import {
  SEPARATOR_MATCH,
  LEVEL_MATCH,
} from './constants';

import isTopicTypeValid from './is-topic-type-valid';

export default (topic: string): boolean => (
  isTopicTypeValid(topic) &&
  topic.split(SEPARATOR_MATCH).every((part: string): boolean => LEVEL_MATCH.test(part))
);
