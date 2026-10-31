/**
 * 3300. Minimum Element After Replacement With Digit Sum
 *
 * The smallest element of `nums` after replacing each with its digit sum.
 *
 * Compute the digit sums and take the minimum.
 *
 * @see https://leetcode.com/problems/minimum-element-after-replacement-with-digit-sum/
 * @difficulty Easy
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumElementAfterReplacementWithDigitSum([10, 12, 13, 14]); // 1
 */
export const minimumElementAfterReplacementWithDigitSum = (
	nums: readonly number[],
): number => {
	let best = Number.POSITIVE_INFINITY;
	for (const num of nums) {
		let sum = 0;
		for (let rest = num; rest > 0; rest = Math.floor(rest / 10))
			sum += rest % 10;
		best = Math.min(best, sum);
	}
	return best;
};
