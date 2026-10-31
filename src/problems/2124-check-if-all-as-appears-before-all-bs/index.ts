/**
 * 2124. Check if All A's Appears Before All B's
 *
 * Returns whether every "a" in the string of "a"s and "b"s comes before
 * every "b".
 *
 * That fails exactly when some "b" is followed by an "a".
 *
 * @see https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfAllAsAppearsBeforeAllBs("aaabbb"); // true
 */
export const checkIfAllAsAppearsBeforeAllBs = (s: string): boolean =>
	!s.includes("ba");
