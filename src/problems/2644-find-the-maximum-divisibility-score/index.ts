/**
 * 2644. Find the Maximum Divisibility Score
 *
 * A divisor's score is how many elements of `nums` it divides. Returns
 * the divisor with the highest score, preferring the smallest.
 *
 * Score each divisor directly.
 *
 * @see https://leetcode.com/problems/find-the-maximum-divisibility-score/
 * @difficulty Easy
 * @timeComplexity O(n · d)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMaximumDivisibilityScore([20, 14, 21, 10], [5, 7, 5]); // 5
 */
export const findTheMaximumDivisibilityScore = (
	nums: readonly number[],
	divisors: readonly number[],
): number => {
	let best = Number.POSITIVE_INFINITY;
	let bestScore = -1;
	for (const divisor of divisors) {
		const score = nums.filter((num) => num % divisor === 0).length;
		if (score > bestScore || (score === bestScore && divisor < best)) {
			best = divisor;
			bestScore = score;
		}
	}
	return best;
};
