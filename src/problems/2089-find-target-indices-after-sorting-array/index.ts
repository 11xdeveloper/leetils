/**
 * 2089. Find Target Indices After Sorting Array
 *
 * Returns the indices `target` would occupy once `nums` is sorted.
 *
 * Count the smaller values and the copies of `target`.
 *
 * @see https://leetcode.com/problems/find-target-indices-after-sorting-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * findTargetIndicesAfterSortingArray([1, 2, 5, 2, 3], 2); // [1, 2]
 */
export const findTargetIndicesAfterSortingArray = (
	nums: readonly number[],
	target: number,
): number[] => {
	let [smaller, equal] = [0, 0];
	for (const num of nums) {
		if (num < target) smaller++;
		else if (num === target) equal++;
	}
	return Array.from({ length: equal }, (_, i) => smaller + i);
};
