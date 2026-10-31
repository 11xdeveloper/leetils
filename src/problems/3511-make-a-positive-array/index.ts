/**
 * 3511. Make a Positive Array
 *
 * An array is positive if every subarray of three or more elements has a
 * positive sum. Each operation replaces one element with any value.
 * Returns the fewest operations to make `nums` positive.
 *
 * Scan left to right within the current stretch since the last
 * replacement. When a subarray of length three or more ending here isn't
 * positive (the prefix sum doesn't beat the largest prefix sum at least two
 * back), replace this element with something huge, which fixes every
 * subarray through it, and start a new stretch.
 *
 * @see https://leetcode.com/problems/make-a-positive-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeAPositiveArray([-10, 15, -12]); // 1
 */
export const makeAPositiveArray = (nums: readonly number[]): number => {
	let operations = 0;
	let prefix = [0];
	let bestOld = Number.NEGATIVE_INFINITY;
	for (const num of nums) {
		const index = prefix.length - 1;
		if (index >= 2) bestOld = Math.max(bestOld, prefix[index - 2] ?? 0);
		const sum = (prefix[index] ?? 0) + num;
		if (index >= 2 && sum <= bestOld) {
			operations++;
			prefix = [0];
			bestOld = Number.NEGATIVE_INFINITY;
		} else prefix.push(sum);
	}
	return operations;
};
