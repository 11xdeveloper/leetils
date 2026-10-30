/**
 * 2275. Largest Combination With Bitwise AND Greater Than Zero
 *
 * Returns the size of the largest subset of `candidates` whose bitwise AND
 * is positive.
 *
 * A positive AND shares some bit; take every number with the most common
 * bit.
 *
 * @see https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/
 * @difficulty Medium
 * @timeComplexity O(24 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * largestCombinationWithBitwiseAndGreaterThanZero([16, 17, 71, 62, 12, 24, 14]); // 4
 */
export const largestCombinationWithBitwiseAndGreaterThanZero = (
	candidates: readonly number[],
): number => {
	let best = 0;
	for (let bit = 0; bit < 31; bit++)
		best = Math.max(
			best,
			candidates.filter((candidate) => candidate & (1 << bit)).length,
		);
	return best;
};
