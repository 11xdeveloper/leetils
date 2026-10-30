/**
 * 2592. Maximize Greatness of an Array
 *
 * Permuting `nums` into `perm`, greatness counts indices where
 * `perm[i] > nums[i]`. Returns the largest greatness possible.
 *
 * Sort, then greedily match each value, smallest first, with the
 * smallest unused value that beats it.
 *
 * @see https://leetcode.com/problems/maximize-greatness-of-an-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeGreatnessOfAnArray([1, 3, 5, 2, 1, 3, 1]); // 4
 */
export const maximizeGreatnessOfAnArray = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let beaten = 0;
	for (const value of sorted) if (value > (sorted[beaten] ?? 0)) beaten++;
	return beaten;
};
