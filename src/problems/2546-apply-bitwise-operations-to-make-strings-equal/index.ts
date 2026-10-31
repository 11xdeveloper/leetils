/**
 * 2546. Apply Bitwise Operations to Make Strings Equal
 *
 * An operation picks two indices `i ≠ j` of a binary string and sets
 * `s[i]` to `s[i] | s[j]` and `s[j]` to `s[i] ^ s[j]`, simultaneously.
 * Returns whether operations can turn `s` into `target`.
 *
 * With a 1 present, any bit can be set or cleared, but the last 1 can
 * never be removed and a 1 can't appear from nothing. So the strings just
 * need to agree on whether they contain a 1.
 *
 * @see https://leetcode.com/problems/apply-bitwise-operations-to-make-strings-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * applyBitwiseOperationsToMakeStringsEqual("1010", "0110"); // true
 */
export const applyBitwiseOperationsToMakeStringsEqual = (
	s: string,
	target: string,
): boolean => s.includes("1") === target.includes("1");
