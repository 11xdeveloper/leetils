/**
 * 2932. Maximum Strong Pair XOR I
 *
 * A pair `x, y` (possibly the same element twice) is strong if
 * `|x - y| <= min(x, y)`. Returns the largest XOR of a strong pair.
 *
 * Check every pair.
 *
 * @see https://leetcode.com/problems/maximum-strong-pair-xor-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumStrongPairXorI([5, 6, 25, 30]); // 7
 */
export const maximumStrongPairXorI = (nums: readonly number[]): number => {
	let best = 0;
	for (const x of nums)
		for (const y of nums)
			if (Math.abs(x - y) <= Math.min(x, y)) best = Math.max(best, x ^ y);
	return best;
};
