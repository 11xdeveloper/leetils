/**
 * 3774. Absolute Difference Between Maximum and Minimum K Elements
 *
 * The sum of the `k` largest elements minus the sum of the `k` smallest.
 *
 * @see https://leetcode.com/problems/absolute-difference-between-maximum-and-minimum-k-elements/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * absoluteDifferenceBetweenMaximumAndMinimumKElements([5, 2, 2, 4], 2); // 5
 */
export const absoluteDifferenceBetweenMaximumAndMinimumKElements = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = [...nums].sort((a, b) => a - b);
	let difference = 0;
	for (let i = 0; i < k; i++)
		difference += (sorted[sorted.length - 1 - i] ?? 0) - (sorted[i] ?? 0);
	return difference;
};
