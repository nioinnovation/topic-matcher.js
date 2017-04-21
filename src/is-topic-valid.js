import {
  SEPARATOR_MATCH,
  LEVEL_MATCH,
} from './constants';

export default topic => (
  isTopicTypeValid(topic) &&
  topic.split(SEPARATOR_MATCH).every(part => LEVEL_MATCH.test(part))
);
