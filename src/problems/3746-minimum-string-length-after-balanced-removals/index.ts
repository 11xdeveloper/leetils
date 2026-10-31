/**
 * 3746. Minimum String Length After Balanced Removals
 *
 * Repeatedly delete a substring with as many a's as b's. Returns the
 * shortest length reachable.
 *
 * While both letters remain, some a sits next to some b and the pair can
 * go, so only the surplus of one letter survives.
 *
 * @see https://leetcode.com/problems/minimum-string-length-after-balanced-removals/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumStringLengthAfterBalancedRemovals("aaabb"); // 1
 */
export const minimumStringLengthAfterBalancedRemovals = (s: string): number => {
	let balance = 0;
	for (const c of s) balance += c === "a" ? 1 : -1;
	return Math.abs(balance);
};
