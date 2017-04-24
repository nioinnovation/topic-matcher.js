// @flow
export default (topic: (string | String)): boolean => (
  (typeof topic === 'string') || (topic instanceof String)
);
