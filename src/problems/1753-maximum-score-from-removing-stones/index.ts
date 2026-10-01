/**
 * 1753. Maximum Score From Removing Stones
 *
 * Each turn takes one stone from two different non-empty piles of sizes
 * `a`, `b` and `c` and scores 1. Returns the largest score.
 *
 * If the largest pile outweighs the other two together, it pairs with
 * every one of them; otherwise all stones can be paired except possibly
 * one.
 *
 * @see https://leetcode.com/problems/maximum-score-from-removing-stones/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumScoreFromRemovingStones(4, 4, 6); // 7
 */
export const maximumScoreFromRemovingStones = (
	a: number,
	b: number,
	c: number,
): number => {
	const total = a + b + c;
	return Math.min(Math.floor(total / 2), total - Math.max(a, b, c));
};
