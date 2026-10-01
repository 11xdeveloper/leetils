/**
 * 561. Array Partition
 *
 * Splits the `2n` numbers of `nums` into `n` pairs to maximise the sum of
 * each pair's minimum, and returns that sum.
 *
 * The smallest number is always some pair's minimum, and pairing it with
 * the second smallest wastes the least. Repeating that, after sorting the
 * answer is the sum of the numbers at even positions.
 *
 * @see https://leetcode.com/problems/array-partition/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * arrayPartition([6, 2, 6, 5, 1, 2]); // 9: (1, 2), (2, 5), (6, 6)
 */
export const arrayPartition = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let sum = 0;
	for (let i = 0; i < sorted.length; i += 2) sum += sorted[i] ?? 0;
	return sum;
};
