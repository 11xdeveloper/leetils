/**
 * 3012. Minimize Length of Array Using Operations
 *
 * Repeatedly pick two positive elements `a` and `b`, append `a mod b` and
 * remove both. Returns the shortest the array can get.
 *
 * Let `m` be the minimum. If some element isn't a multiple of `m`, taking
 * it mod `m` makes a new, unique minimum that can then remove everything
 * else, leaving 1. Otherwise nothing smaller than `m` can ever appear, and
 * copies of `m` can only cancel in pairs (making 0), leaving half of them,
 * rounded up.
 *
 * @see https://leetcode.com/problems/minimize-length-of-array-using-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeLengthOfArrayUsingOperations([1, 4, 3, 1]); // 1
 * minimizeLengthOfArrayUsingOperations([5, 5, 5, 10, 5]); // 2
 */
export const minimizeLengthOfArrayUsingOperations = (
	nums: readonly number[],
): number => {
	const min = Math.min(...nums);
	let copies = 0;
	for (const num of nums) {
		if (num % min !== 0) return 1;
		if (num === min) copies++;
	}
	return Math.ceil(copies / 2);
};
