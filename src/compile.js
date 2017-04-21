import {
  LEVEL_ALLOWED_CHARACTERS,
  SEPARATOR,
  SEPARATOR_MATCH,
} from './constants';

const transformPatternPart = (exp, sub) => (
  (sub === '**') ? (exp + `(${LEVEL_ALLOWED_CHARACTERS}+${SEPARATOR})*`)
  : (sub === '*') ? (exp + `${LEVEL_ALLOWED_CHARACTERS}+${SEPARATOR}`)
  : (exp + `${sub.replace('*', '\\*')}${SEPARATOR}`)
);

const transform = pattern => pattern
  .split(SEPARATOR_MATCH)
  .reduce(transformPatternPart, '');

export default pattern => RegExp(`^${transform(pattern)}$`);
