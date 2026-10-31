/**
 * 3952. Maximum Total Value of Covered Indices
 *
 * Tokens sit where `s` has a 1; each may move once, one step left. Returns
 * the largest total of `nums` over the indices holding a token.
 *
 * Sweep the tokens from the left, each staying or stepping left. Covers
 * can only collide when a token steps onto a neighbour that stayed, which
 * gains nothing, so track the best total by whether the last token stayed.
 *
 * @see https://leetcode.com/problems/maximum-total-value-of-covered-indices/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumTotalValueOfCoveredIndices([9, 2, 6, 1], "0101"); // 15
 */
export const maximumTotalValueOfCoveredIndices = (
	nums: readonly number[],
	s: string,
): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	let [stayed, moved] = [NONE, 0];
	let previous = -2;
	for (let i = 0; i < s.length; i++) {
		if (s[i] !== "1") continue;
		const before = Math.max(stayed, moved);
		const nextStayed = before + (nums[i] ?? 0);
		// Stepping onto a neighbour that stayed would gain nothing.
		const fromBefore = previous === i - 1 ? moved : before;
		const nextMoved = i > 0 ? fromBefore + (nums[i - 1] ?? 0) : NONE;
		[stayed, moved, previous] = [nextStayed, nextMoved, i];
	}
	return Math.max(stayed, moved, 0);
};
