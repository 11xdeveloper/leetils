/**
 * 1827. Minimum Operations to Make the Array Increasing
 *
 * Each operation increments one element. Returns the fewest operations
 * making `nums` strictly increasing.
 *
 * Raise each element to one more than the previous when needed.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeTheArrayIncreasing([1, 5, 2, 4, 1]); // 14
 */
export const minimumOperationsToMakeTheArrayIncreasing = (
	nums: readonly number[],
): number => {
	let [operations, previous] = [0, -Infinity];
	for (const num of nums) {
		const value = Math.max(num, previous + 1);
		operations += value - num;
		previous = value;
	}
	return operations;
};
