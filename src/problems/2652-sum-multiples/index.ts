/**
 * 2652. Sum Multiples
 *
 * Returns the sum of the integers from 1 to `n` divisible by 3, 5 or 7.
 *
 * Inclusion–exclusion over the multiples of each combination of the
 * three, each summed in closed form.
 *
 * @see https://leetcode.com/problems/sum-multiples/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * sumMultiples(10); // 40
 */
export const sumMultiples = (n: number): number => {
	const multiplesOf = (d: number): number => {
		const count = Math.floor(n / d);
		return (d * count * (count + 1)) / 2;
	};
	return (
		multiplesOf(3) +
		multiplesOf(5) +
		multiplesOf(7) -
		multiplesOf(15) -
		multiplesOf(21) -
		multiplesOf(35) +
		multiplesOf(105)
	);
};
