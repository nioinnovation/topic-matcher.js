import { expect } from 'chai';

import matches from '../src'

describe('topic matching algorithm', () => {

  it('should match exact matches', () => {
    expect(matches("A", "A")).to.be.true;
    expect(matches("A", "A.1")).to.be.false;
    expect(matches("A", "A.1.a")).to.be.false;
    expect(matches("A", "A.2")).to.be.false;
    expect(matches("A", "A.2.a")).to.be.false;
    expect(matches("A", "A.2.b")).to.be.false;
    expect(matches("A", "B")).to.be.false;
    expect(matches("A", "B.a")).to.be.false;
    expect(matches("A", "B.1")).to.be.false;
    expect(matches("A", "B.1.a")).to.be.false;
    expect(matches("A", "B.1.b")).to.be.false;
  });

  it('should match exact nested matches', () => {
    expect(matches("A.1", "A")).to.be.false;
    expect(matches("A.1", "A.1")).to.be.true;
    expect(matches("A.1", "A.1.a")).to.be.false;
    expect(matches("A.1", "A.2")).to.be.false;
    expect(matches("A.1", "A.2.a")).to.be.false;
    expect(matches("A.1", "A.2.b")).to.be.false;
    expect(matches("A.1", "B")).to.be.false;
    expect(matches("A.1", "B.a")).to.be.false;
    expect(matches("A.1", "B.1")).to.be.false;
    expect(matches("A.1", "B.1.a")).to.be.false;
    expect(matches("A.1", "B.1.b")).to.be.false;

    expect(matches("A.1.a", "A")).to.be.false;
    expect(matches("A.1.a", "A.1")).to.be.false;
    expect(matches("A.1.a", "A.1.a")).to.be.true;
    expect(matches("A.1.a", "A.2")).to.be.false;
    expect(matches("A.1.a", "A.2.a")).to.be.false;
    expect(matches("A.1.a", "A.2.b")).to.be.false;
    expect(matches("A.1.a", "B")).to.be.false;
    expect(matches("A.1.a", "B.a")).to.be.false;
    expect(matches("A.1.a", "B.1")).to.be.false;
    expect(matches("A.1.a", "B.1.a")).to.be.false;
    expect(matches("A.1.a", "B.1.b")).to.be.false;
  });

  it('should match wildcards', () => {
    expect(matches("A.*", "A")).to.be.false;
    expect(matches("A.*", "A.1")).to.be.true;
    expect(matches("A.*", "A.1.a")).to.be.false;
    expect(matches("A.*", "A.2")).to.be.true;
    expect(matches("A.*", "A.2.a")).to.be.false;
    expect(matches("A.*", "A.2.b")).to.be.false;
    expect(matches("A.*", "B")).to.be.false;
    expect(matches("A.*", "B.a")).to.be.false;
    expect(matches("A.*", "B.1")).to.be.false;
    expect(matches("A.*", "B.1.a")).to.be.false;
    expect(matches("A.*", "B.1.b")).to.be.false;

    expect(matches("A.1.*", "A")).to.be.false;
    expect(matches("A.1.*", "A.1")).to.be.false;
    expect(matches("A.1.*", "A.1.a")).to.be.true;
    expect(matches("A.1.*", "A.2")).to.be.false;
    expect(matches("A.1.*", "A.2.a")).to.be.false;
    expect(matches("A.1.*", "A.2.b")).to.be.false;
    expect(matches("A.1.*", "B")).to.be.false;
    expect(matches("A.1.*", "B.a")).to.be.false;
    expect(matches("A.1.*", "B.1")).to.be.false;
    expect(matches("A.1.*", "B.1.a")).to.be.false;
    expect(matches("A.1.*", "B.1.b")).to.be.false;

    expect(matches("A.*.a", "A")).to.be.false;
    expect(matches("A.*.a", "A.1")).to.be.false;
    expect(matches("A.*.a", "A.1.a")).to.be.true;
    expect(matches("A.*.a", "A.2")).to.be.false;
    expect(matches("A.*.a", "A.2.a")).to.be.true;
    expect(matches("A.*.a", "A.2.b")).to.be.false;
    expect(matches("A.*.a", "B")).to.be.false;
    expect(matches("A.*.a", "B.a")).to.be.false;
    expect(matches("A.*.a", "B.1")).to.be.false;
    expect(matches("A.*.a", "B.1.a")).to.be.false;
    expect(matches("A.*.a", "B.1.b")).to.be.false;

    expect(matches("B.*.a", "A")).to.be.false;
    expect(matches("B.*.a", "A.1")).to.be.false;
    expect(matches("B.*.a", "A.1.a")).to.be.false;
    expect(matches("B.*.a", "A.2")).to.be.false;
    expect(matches("B.*.a", "A.2.a")).to.be.false;
    expect(matches("B.*.a", "A.2.b")).to.be.false;
    expect(matches("B.*.a", "B")).to.be.false;
    expect(matches("B.*.a", "B.a")).to.be.false;
    expect(matches("B.*.a", "B.1")).to.be.false;
    expect(matches("B.*.a", "B.1.a")).to.be.true;
    expect(matches("B.*.a", "B.1.b")).to.be.false;
  });


  it('should match globstars', () => {
    expect(matches("A.1.**", "A")).to.be.false;
    expect(matches("A.1.**", "A.1")).to.be.true;
    expect(matches("A.1.**", "A.1.a")).to.be.true;
    expect(matches("A.1.**", "A.2")).to.be.false;
    expect(matches("A.1.**", "A.2.a")).to.be.false;
    expect(matches("A.1.**", "A.2.b")).to.be.false;
    expect(matches("A.1.**", "B")).to.be.false;
    expect(matches("A.1.**", "B.a")).to.be.false;
    expect(matches("A.1.**", "B.1")).to.be.false;
    expect(matches("A.1.**", "B.1.a")).to.be.false;
    expect(matches("A.1.**", "B.1.b")).to.be.false;

    expect(matches("A.**", "A")).to.be.true;
    expect(matches("A.**", "A.1")).to.be.true;
    expect(matches("A.**", "A.1.a")).to.be.true;
    expect(matches("A.**", "A.2")).to.be.true;
    expect(matches("A.**", "A.2.a")).to.be.true;
    expect(matches("A.**", "A.2.b")).to.be.true;
    expect(matches("A.**", "B")).to.be.false;
    expect(matches("A.**", "B.a")).to.be.false;
    expect(matches("A.**", "B.1")).to.be.false;
    expect(matches("A.**", "B.1.a")).to.be.false;
    expect(matches("A.**", "B.1.b")).to.be.false;

    expect(matches("A.*.**", "A")).to.be.false;
    expect(matches("A.*.**", "A.1")).to.be.true;
    expect(matches("A.*.**", "A.1.a")).to.be.true;
    expect(matches("A.*.**", "A.2")).to.be.true;
    expect(matches("A.*.**", "A.2.a")).to.be.true;
    expect(matches("A.*.**", "A.2.b")).to.be.true;
    expect(matches("A.*.**", "B")).to.be.false;
    expect(matches("A.*.**", "B.a")).to.be.false;
    expect(matches("A.*.**", "B.1")).to.be.false;
    expect(matches("A.*.**", "B.1.a")).to.be.false;
    expect(matches("A.*.**", "B.1.b")).to.be.false;

    expect(matches("A.**.a", "A")).to.be.false;
    expect(matches("A.**.a", "A.1")).to.be.false;
    expect(matches("A.**.a", "A.1.a")).to.be.true;
    expect(matches("A.**.a", "A.2")).to.be.false;
    expect(matches("A.**.a", "A.2.a")).to.be.true;
    expect(matches("A.**.a", "A.2.b")).to.be.false;
    expect(matches("A.**.a", "B")).to.be.false;
    expect(matches("A.**.a", "B.a")).to.be.false;
    expect(matches("A.**.a", "B.1")).to.be.false;
    expect(matches("A.**.a", "B.1.a")).to.be.false;
    expect(matches("A.**.a", "B.1.b")).to.be.false;

    expect(matches("B.**.a", "A")).to.be.false;
    expect(matches("B.**.a", "A.1")).to.be.false;
    expect(matches("B.**.a", "A.1.a")).to.be.false;
    expect(matches("B.**.a", "A.2")).to.be.false;
    expect(matches("B.**.a", "A.2.a")).to.be.false;
    expect(matches("B.**.a", "A.2.b")).to.be.false;
    expect(matches("B.**.a", "B")).to.be.false;
    expect(matches("B.**.a", "B.a")).to.be.true;
    expect(matches("B.**.a", "B.1")).to.be.false;
    expect(matches("B.**.a", "B.1.a")).to.be.true;
    expect(matches("B.**.a", "B.1.b")).to.be.false;
  });

  it('should match paths that start with a wildcard', () => {
    expect(matches("*.a", "A")).to.be.false;
    expect(matches("*.a", "A.1")).to.be.false;
    expect(matches("*.a", "A.1.a")).to.be.false;
    expect(matches("*.a", "A.2")).to.be.false;
    expect(matches("*.a", "A.2.a")).to.be.false;
    expect(matches("*.a", "A.2.b")).to.be.false;
    expect(matches("*.a", "B")).to.be.false;
    expect(matches("*.a", "B.a")).to.be.true;
    expect(matches("*.a", "B.1")).to.be.false;
    expect(matches("*.a", "B.1.a")).to.be.false;
    expect(matches("*.a", "B.1.b")).to.be.false;

    expect(matches("*.1", "A")).to.be.false;
    expect(matches("*.1", "A.1")).to.be.true;
    expect(matches("*.1", "A.1.a")).to.be.false;
    expect(matches("*.1", "A.2")).to.be.false;
    expect(matches("*.1", "A.2.a")).to.be.false;
    expect(matches("*.1", "A.2.b")).to.be.false;
    expect(matches("*.1", "B")).to.be.false;
    expect(matches("*.1", "B.a")).to.be.false;
    expect(matches("*.1", "B.1")).to.be.true;
    expect(matches("*.1", "B.1.a")).to.be.false;
    expect(matches("*.1", "B.1.b")).to.be.false;
  });

  it('should match paths that start with a globstar', () => {
    expect(matches("**.a", "A")).to.be.false;
    expect(matches("**.a", "A.1")).to.be.false;
    expect(matches("**.a", "A.1.a")).to.be.true;
    expect(matches("**.a", "A.2")).to.be.false;
    expect(matches("**.a", "A.2.a")).to.be.true;
    expect(matches("**.a", "A.2.b")).to.be.false;
    expect(matches("**.a", "B")).to.be.false;
    expect(matches("**.a", "B.a")).to.be.true;
    expect(matches("**.a", "B.1")).to.be.false;
    expect(matches("**.a", "B.1.a")).to.be.true;
    expect(matches("**.a", "B.1.b")).to.be.false;
  });

  it('should match all the things!', () => {
    expect(matches("*.1.*", "A")).to.be.false;
    expect(matches("*.1.*", "A.1")).to.be.false;
    expect(matches("*.1.*", "A.1.a")).to.be.true;
    expect(matches("*.1.*", "A.2")).to.be.false;
    expect(matches("*.1.*", "A.2.a")).to.be.false;
    expect(matches("*.1.*", "A.2.b")).to.be.false;
    expect(matches("*.1.*", "B")).to.be.false;
    expect(matches("*.1.*", "B.a")).to.be.false;
    expect(matches("*.1.*", "B.1")).to.be.false;
    expect(matches("*.1.*", "B.1.a")).to.be.true;
    expect(matches("*.1.*", "B.1.b")).to.be.true;

    expect(matches("*.1.**", "A")).to.be.false;
    expect(matches("*.1.**", "A.1")).to.be.true;
    expect(matches("*.1.**", "A.1.a")).to.be.true;
    expect(matches("*.1.**", "A.2")).to.be.false;
    expect(matches("*.1.**", "A.2.a")).to.be.false;
    expect(matches("*.1.**", "A.2.b")).to.be.false;
    expect(matches("*.1.**", "B")).to.be.false;
    expect(matches("*.1.**", "B.a")).to.be.false;
    expect(matches("*.1.**", "B.1")).to.be.true;
    expect(matches("*.1.**", "B.1.a")).to.be.true;
    expect(matches("*.1.**", "B.1.b")).to.be.true;

    expect(matches("*", "A")).to.be.true;
    expect(matches("*", "A.1")).to.be.false;
    expect(matches("*", "A.1.a")).to.be.false;
    expect(matches("*", "A.2")).to.be.false;
    expect(matches("*", "A.2.a")).to.be.false;
    expect(matches("*", "A.2.b")).to.be.false;
    expect(matches("*", "B")).to.be.true;
    expect(matches("*", "B.a")).to.be.false;
    expect(matches("*", "B.1")).to.be.false;
    expect(matches("*", "B.1.a")).to.be.false;
    expect(matches("*", "B.1.b")).to.be.false;

    expect(matches("*.**", "A")).to.be.true;
    expect(matches("*.**", "A.1")).to.be.true;
    expect(matches("*.**", "A.1.a")).to.be.true;
    expect(matches("*.**", "A.2")).to.be.true;
    expect(matches("*.**", "A.2.a")).to.be.true;
    expect(matches("*.**", "A.2.b")).to.be.true;
    expect(matches("*.**", "B")).to.be.true;
    expect(matches("*.**", "B.a")).to.be.true;
    expect(matches("*.**", "B.1")).to.be.true;
    expect(matches("*.**", "B.1.a")).to.be.true;
    expect(matches("*.**", "B.1.b")).to.be.true;

    expect(matches("**", "A")).to.be.true;
    expect(matches("**", "A.1")).to.be.true;
    expect(matches("**", "A.1.a")).to.be.true;
    expect(matches("**", "A.2")).to.be.true;
    expect(matches("**", "A.2.a")).to.be.true;
    expect(matches("**", "A.2.b")).to.be.true;
    expect(matches("**", "B")).to.be.true;
    expect(matches("**", "B.a")).to.be.true;
    expect(matches("**", "B.1")).to.be.true;
    expect(matches("**", "B.1.a")).to.be.true;
    expect(matches("**", "B.1.b")).to.be.true;

    expect(matches("**.**", "A")).to.be.true;
    expect(matches("**.**", "A.1")).to.be.true;
    expect(matches("**.**", "A.1.a")).to.be.true;
    expect(matches("**.**", "A.2")).to.be.true;
    expect(matches("**.**", "A.2.a")).to.be.true;
    expect(matches("**.**", "A.2.b")).to.be.true;
    expect(matches("**.**", "B")).to.be.true;
    expect(matches("**.**", "B.a")).to.be.true;
    expect(matches("**.**", "B.1")).to.be.true;
    expect(matches("**.**", "B.1.a")).to.be.true;
    expect(matches("**.**", "B.1.b")).to.be.true;

    expect(matches("**.*", "A")).to.be.true;
    expect(matches("**.*", "A.1")).to.be.true;
    expect(matches("**.*", "A.1.a")).to.be.true;
    expect(matches("**.*", "A.2")).to.be.true;
    expect(matches("**.*", "A.2.a")).to.be.true;
    expect(matches("**.*", "A.2.b")).to.be.true;
    expect(matches("**.*", "B")).to.be.true;
    expect(matches("**.*", "B.a")).to.be.true;
    expect(matches("**.*", "B.1")).to.be.true;
    expect(matches("**.*", "B.1.a")).to.be.true;
    expect(matches("**.*", "B.1.b")).to.be.true;

    expect(matches("*.*.**", "A")).to.be.false;
    expect(matches("*.*.**", "A.1")).to.be.true;
    expect(matches("*.*.**", "A.1.a")).to.be.true;
    expect(matches("*.*.**", "A.2")).to.be.true;
    expect(matches("*.*.**", "A.2.a")).to.be.true;
    expect(matches("*.*.**", "A.2.b")).to.be.true;
    expect(matches("*.*.**", "B")).to.be.false;
    expect(matches("*.*.**", "B.a")).to.be.true;
    expect(matches("*.*.**", "B.1")).to.be.true;
    expect(matches("*.*.**", "B.1.a")).to.be.true;
    expect(matches("*.*.**", "B.1.b")).to.be.true;
  });

  it('should handle some other cases', () => {
    expect(matches("a.b", "a.b.c")).to.be.false;

    // asserting several level wildcards
    expect(matches("*.*.c.*", "a.b.c.d")).to.be.true;
    expect(matches("*.*.c.d", "a.b.c.d")).to.be.true;
    expect(matches("*.*.c.d.*", "a.b.c.d.e")).to.be.true;

    expect(matches('a.**.*', 'a')).to.be.false;
    expect(matches('a.**.*', 'a.b')).to.be.true;
    expect(matches('a.**.*', 'a.b.c')).to.be.true;
    expect(matches('a.**.**', 'a')).to.be.true;
    expect(matches('a.**.**', 'a.b')).to.be.true;
    expect(matches('a.**.**', 'a.b.c')).to.be.true;

    expect(matches("root.node1", "root.node2")).to.be.false;
    expect(matches("root1.node1", "root.node1")).to.be.false;
    expect(matches("*.*", "root.node1")).to.be.true;

    // asserting that spaces are not trimmed
    expect(matches('  a', 'a   ')).to.be.false;
    expect(matches('  a', 'a')).to.be.false;
    expect(matches('a  ', 'a')).to.be.false;
    expect(matches('   a   ', 'a')).to.be.false;
    // not a match, spaces inside topic are just another character
    expect(matches('a.  b  ', 'a.b')).to.be.false;

    // assert that spaces are matched (no recommended though)
    expect(matches('a   ', 'a   ')).to.be.true;
    expect(matches('a   .b', 'a   .b')).to.be.true;
    expect(matches('  a   .b', '  a   .b')).to.be.true;
    expect(matches('  a   .b  ', '  a   .b  ')).to.be.true;

    // asserting that when '*' is surrounded by other characters it has
    // no special meaning
    expect(matches("a*.c", "a*.c")).to.be.true;
    expect(matches("a*.c", "ab.c")).to.be.false;
    expect(matches("*b.c", "*b.c")).to.be.true;
    expect(matches("*b.c", "ab.c")).to.be.false;

    // adapting old matching table to new matching
    expect(matches("a", "a")).to.be.true;
    expect(matches("a", "a.b1")).to.be.false;
    expect(matches("a", "a.b1.c1")).to.be.false;
    expect(matches("a", "a.b1.c1.end")).to.be.false;
    expect(matches("a", "a.b1.end")).to.be.false;
    expect(matches("a", "a.b2")).to.be.false;
    expect(matches("a", "a.b2.end")).to.be.false;
    expect(matches("a", "a2")).to.be.false;
    expect(matches("a", "a2.end")).to.be.false;

    expect(matches("a.b1", "a")).to.be.false;
    expect(matches("a.b1", "a.b1")).to.be.true;
    expect(matches("a.b1", "a.b1.c1")).to.be.false;
    expect(matches("a.b1", "a.b1.c1.end")).to.be.false;
    expect(matches("a.b1", "a.b1.end")).to.be.false;
    expect(matches("a.b1", "a.b2")).to.be.false;
    expect(matches("a.b1", "a.b2.end")).to.be.false;
    expect(matches("a.b1", "a2")).to.be.false;
    expect(matches("a.b1", "a2.end")).to.be.false;

    expect(matches("a.b1.c1", "a")).to.be.false;
    expect(matches("a.b1.c1", "a.b1")).to.be.false;
    expect(matches("a.b1.c1", "a.b1.c1")).to.be.true;
    expect(matches("a.b1.c1", "a.b1.c1.end")).to.be.false;
    expect(matches("a.b1.c1", "a.b1.end")).to.be.false;
    expect(matches("a.b1.c1", "a.b2")).to.be.false;
    expect(matches("a.b1.c1", "a.b2.end")).to.be.false;
    expect(matches("a.b1.c1", "a2")).to.be.false;
    expect(matches("a.b1.c1", "a2.end")).to.be.false;

    expect(matches("a.b1.c1.end", "a")).to.be.false;
    expect(matches("a.b1.c1.end", "a.b1")).to.be.false;
    expect(matches("a.b1.c1.end", "a.b1.c1")).to.be.false;
    expect(matches("a.b1.c1.end", "a.b1.c1.end")).to.be.true;
    expect(matches("a.b1.c1.end", "a.b1.end")).to.be.false;
    expect(matches("a.b1.c1.end", "a.b2")).to.be.false;
    expect(matches("a.b1.c1.end", "a.b2.end")).to.be.false;
    expect(matches("a.b1.c1.end", "a2")).to.be.false;
    expect(matches("a.b1.c1.end", "a2.end")).to.be.false;

    expect(matches("a.b2", "a")).to.be.false;
    expect(matches("a.b2", "a.b1")).to.be.false;
    expect(matches("a.b2", "a.b1.c1")).to.be.false;
    expect(matches("a.b2", "a.b1.c1.end")).to.be.false;
    expect(matches("a.b2", "a.b1.end")).to.be.false;
    expect(matches("a.b2", "a.b2")).to.be.true;
    expect(matches("a.b2", "a.b2.end")).to.be.false;
    expect(matches("a.b2", "a2")).to.be.false;
    expect(matches("a.b2", "a2.end")).to.be.false;

    expect(matches("a.end", "a")).to.be.false;
    expect(matches("a.end", "a.b1")).to.be.false;
    expect(matches("a.end", "a.b1.c1")).to.be.false;
    expect(matches("a.end", "a.b1.c1.end")).to.be.false;
    expect(matches("a.end", "a.b1.end")).to.be.false;
    expect(matches("a.end", "a.b2")).to.be.false;
    expect(matches("a.end", "a.b2.end")).to.be.false;
    expect(matches("a.end", "a2")).to.be.false;
    expect(matches("a.end", "a2.end")).to.be.false;

    expect(matches("*.end", "a")).to.be.false;
    expect(matches("*.end", "a.b1")).to.be.false;
    expect(matches("*.end", "a.b1.c1")).to.be.false;
    expect(matches("*.end", "a.b1.c1.end")).to.be.false;
    expect(matches("*.end", "a.b1.end")).to.be.false;
    expect(matches("*.end", "a.b2")).to.be.false;
    expect(matches("*.end", "a.b2.end")).to.be.false;
    expect(matches("*.end", "a2")).to.be.false;
    expect(matches("*.end", "a2.end")).to.be.true;

    expect(matches("**.end", "a")).to.be.false;
    expect(matches("**.end", "a.b1")).to.be.false;
    expect(matches("**.end", "a.b1.c1")).to.be.false;
    expect(matches("**.end", "a.b1.c1.end")).to.be.true;
    expect(matches("**.end", "a.b1.end")).to.be.true;
    expect(matches("**.end", "a.b2")).to.be.false;
    expect(matches("**.end", "a.b2.end")).to.be.true;
    expect(matches("**.end", "a2")).to.be.false;
    expect(matches("**.end", "a2.end")).to.be.true;

    expect(matches("a.*.end", "a")).to.be.false;
    expect(matches("a.*.end", "a.b1")).to.be.false;
    expect(matches("a.*.end", "a.b1.c1")).to.be.false;
    expect(matches("a.*.end", "a.b1.c1.end")).to.be.false;
    expect(matches("a.*.end", "a.b1.end")).to.be.true;
    expect(matches("a.*.end", "a.b2")).to.be.false;
    expect(matches("a.*.end", "a.b2.end")).to.be.true;
    expect(matches("a.*.end", "a2")).to.be.false;
    expect(matches("a.*.end", "a2.end")).to.be.false;

    expect(matches("a.**.end", "a")).to.be.false;
    expect(matches("a.**.end", "a.b1")).to.be.false;
    expect(matches("a.**.end", "a.b1.c1")).to.be.false;
    expect(matches("a.**.end", "a.b1.c1.end")).to.be.true;
    expect(matches("a.**.end", "a.b1.end")).to.be.true;
    expect(matches("a.**.end", "a.b2")).to.be.false;
    expect(matches("a.**.end", "a.b2.end")).to.be.true;
    expect(matches("a.**.end", "a2")).to.be.false;
    expect(matches("a.**.end", "a2.end")).to.be.false;

    expect(matches("a.*.*.end", "a")).to.be.false;
    expect(matches("a.*.*.end", "a.b1")).to.be.false;
    expect(matches("a.*.*.end", "a.b1.c1")).to.be.false;
    expect(matches("a.*.*.end", "a.b1.c1.end")).to.be.true;
    expect(matches("a.*.*.end", "a.b1.end")).to.be.false;
    expect(matches("a.*.*.end", "a.b2")).to.be.false;
    expect(matches("a.*.*.end", "a.b2.end")).to.be.false;
    expect(matches("a.*.*.end", "a2")).to.be.false;
    expect(matches("a.*.*.end", "a2.end")).to.be.false;

    // more prefix mismatches
    expect(matches("ab", "a")).to.be.false;
    expect(matches("ab", "a.b1")).to.be.false;
    expect(matches("ab", "a.b1.c1")).to.be.false;
    expect(matches("ab", "a.b1.c1.end")).to.be.false;
    expect(matches("ab", "a.b1.end")).to.be.false;
    expect(matches("ab", "a.b2")).to.be.false;
    expect(matches("ab", "a.b2.end")).to.be.false;
    expect(matches("ab", "a2")).to.be.false;
    expect(matches("ab", "a2.end")).to.be.false;

    expect(matches("a.*", "a")).to.be.false;
    expect(matches("a.*", "a.b1")).to.be.true;
    expect(matches("a.*", "a.b1.c1")).to.be.false;
    expect(matches("a.*", "a.b1.c1.end")).to.be.false;
    expect(matches("a.*", "a.b1.end")).to.be.false;
    expect(matches("a.*", "a.b2")).to.be.true;
    expect(matches("a.*", "a.b2.end")).to.be.false;
    expect(matches("a.*", "a2")).to.be.false;
    expect(matches("a.*", "a2.end")).to.be.false;

    expect(matches("a.**", "a")).to.be.true;
    expect(matches("a.**", "a.b1")).to.be.true;
    expect(matches("a.**", "a.b1.c1")).to.be.true;
    expect(matches("a.**", "a.b1.c1.end")).to.be.true;
    expect(matches("a.**", "a.b1.end")).to.be.true;
    expect(matches("a.**", "a.b2")).to.be.true;
    expect(matches("a.**", "a.b2.end")).to.be.true;
    expect(matches("a.**", "a2")).to.be.false;
    expect(matches("a.**", "a2.end")).to.be.false;

    expect(matches("*", "a")).to.be.true;
    expect(matches("*", "a.b1")).to.be.false;
    expect(matches("*", "a.b1.c1")).to.be.false;
    expect(matches("*", "a.b1.c1.end")).to.be.false;
    expect(matches("*", "a.b1.end")).to.be.false;
    expect(matches("*", "a.b2")).to.be.false;
    expect(matches("*", "a.b2.end")).to.be.false;
    expect(matches("*", "a2")).to.be.true;
    expect(matches("*", "a2.end")).to.be.false;

    // asserting several level wildcards
    expect(matches("*.*.c.*", "a.b.c.d")).to.be.true;
    expect(matches("*.*.c.d.*", "a.b.c.d")).to.be.false;
    expect(matches("*.*.c.d.*", "a.b.c.d.e")).to.be.true;
  });

  it('should only match acceptable topics', () => {
    expect(matches("A", {})).to.be.false;
    expect(matches({}, "A")).to.be.false;
    expect(matches("A", [])).to.be.false;
    expect(matches([], "A")).to.be.false;
  });
});
