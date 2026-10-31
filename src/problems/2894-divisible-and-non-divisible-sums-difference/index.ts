/**
 * 2894. Divisible and Non-divisible Sums Difference
 *
 * Returns the sum of the integers from 1 to `n` not divisible by `m`,
 * minus the sum of those that are.
 *
 * Both sums in closed form: the multiples of `m` sum to `m · c(c + 1)/2`
 * with `c = ⌊n / m⌋`.
 *
 * @see https://leetcode.com/problems/divisible-and-non-divisible-sums-difference/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * divisibleAndNonDivisibleSumsDifference(10, 3); // 19
 */
export const divisibleAndNonDivisibleSumsDifference = (
	n: number,
	m: number,
): number => {
	const count = Math.floor(n / m);
	const divisible = (m * count * (count + 1)) / 2;
	return (n * (n + 1)) / 2 - 2 * divisible;
};
