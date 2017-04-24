// @flow
export default (topic: string): boolean => (
  (typeof topic === 'string') || (topic instanceof String)
);
