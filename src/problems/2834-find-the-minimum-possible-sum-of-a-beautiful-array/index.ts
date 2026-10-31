/**
 * 2834. Find the Minimum Possible Sum of a Beautiful Array
 *
 * A beautiful array has `n` distinct positive integers, no two summing to
 * `target`. Returns the smallest possible sum, modulo 1e9 + 7.
 *
 * Take `1..⌊target/2⌋`, the smaller of each clashing pair, then integers
 * from `target` upwards. The sums exceed 2⁵³, so use BigInt.
 *
 * @see https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMinimumPossibleSumOfABeautifulArray(3, 3); // 8
 */
export const findTheMinimumPossibleSumOfABeautifulArray = (
	n: number,
	target: number,
): number => {
	const low = BigInt(Math.min(n, Math.floor(target / 2)));
	const high = BigInt(n) - low;
	const sum =
		(low * (low + 1n)) / 2n + high * BigInt(target) + (high * (high - 1n)) / 2n;
	return Number(sum % 1_000_000_007n);
};
