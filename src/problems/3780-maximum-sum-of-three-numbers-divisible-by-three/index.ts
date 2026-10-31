/**
 * 3780. Maximum Sum of Three Numbers Divisible by Three
 *
 * The largest sum of three elements that's divisible by 3, or 0.
 *
 * Keep the three largest values of each remainder; the remainders must be
 * all equal or all different.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-three-numbers-divisible-by-three/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfThreeNumbersDivisibleByThree([4, 2, 3, 1]); // 9
 */
export const maximumSumOfThreeNumbersDivisibleByThree = (
	nums: readonly number[],
): number => {
	const byRemainder: number[][] = [[], [], []];
	for (const num of [...nums].sort((a, b) => b - a)) {
		const group = byRemainder[num % 3] ?? [];
		if (group.length < 3) group.push(num);
	}
	const [zero = [], one = [], two = []] = byRemainder;
	let best = 0;
	for (const group of byRemainder)
		if (group.length === 3)
			best = Math.max(
				best,
				group.reduce((a, b) => a + b, 0),
			);
	if (zero.length > 0 && one.length > 0 && two.length > 0)
		best = Math.max(best, (zero[0] ?? 0) + (one[0] ?? 0) + (two[0] ?? 0));
	return best;
};
