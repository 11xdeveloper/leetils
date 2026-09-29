// An integer or decimal, optionally followed by an exponent: `e` or `E` and
// an integer. A decimal needs a digit on at least one side of its point.
const NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

/**
 * 65. Valid Number
 *
 * Returns whether `s` is a valid number: an optionally signed integer or
 * decimal, optionally followed by `e` or `E` and an optionally signed
 * integer. `"4."`, `"-.9"` and `"2e10"` are valid; `"."`, `"e3"` and `"1e"`
 * are not.
 *
 * The grammar is regular, so a regular expression matches it exactly, in a
 * single pass without backtracking.
 *
 * @see https://leetcode.com/problems/valid-number/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * validNumber("-90E3"); // true
 * validNumber("99e2.5"); // false
 */
export const validNumber = (s: string): boolean => NUMBER.test(s);
