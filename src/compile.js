// @flow
import {
  LEVEL_ALLOWED_CHARACTERS,
  SEPARATOR,
  SEPARATOR_MATCH,
} from './constants';

const transformPatternPart = (exp: string, sub: string): string => (
  (sub === '**') ? (`${exp}(${LEVEL_ALLOWED_CHARACTERS}+${SEPARATOR})*`)
  : (sub === '*') ? (`${exp}${LEVEL_ALLOWED_CHARACTERS}+${SEPARATOR}`)
  : (`${exp}${sub.replace('*', '\\*')}${SEPARATOR}`)
);

const transform = (pattern: string): string => pattern
  .split(SEPARATOR_MATCH)
  .reduce(transformPatternPart, '');

export default (pattern: string): RegExp => RegExp(`^${transform(pattern)}$`);
