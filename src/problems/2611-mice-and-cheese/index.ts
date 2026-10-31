/**
 * 2611. Mice and Cheese
 *
 * Two mice share the cheeses; cheese `i` is worth `reward1[i]` to the
 * first and `reward2[i]` to the second. The first mouse eats exactly
 * `k`. Returns the largest total reward.
 *
 * Start with the second mouse eating everything, then hand the first the
 * `k` cheeses where switching gains the most.
 *
 * @see https://leetcode.com/problems/mice-and-cheese/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * miceAndCheese([1, 1, 3, 4], [4, 4, 1, 1], 2); // 15
 */
export const miceAndCheese = (
	reward1: readonly number[],
	reward2: readonly number[],
	k: number,
): number =>
	reward2.reduce((sum, r) => sum + r, 0) +
	reward1
		.map((r, i) => r - (reward2[i] ?? 0))
		.sort((a, b) => b - a)
		.slice(0, k)
		.reduce((sum, gain) => sum + gain, 0);
