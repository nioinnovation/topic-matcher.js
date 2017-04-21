export const LEVEL_ALLOWED_CHARACTERS = '[0-9A-Za-z_\* \-]';
export const LEVEL_MATCH = RegExp(`^${LEVEL_ALLOWED_CHARACTERS}+$`);
export const SEPARATOR = '\\.';
export const SEPARATOR_MATCH = RegExp(SEPARATOR);
