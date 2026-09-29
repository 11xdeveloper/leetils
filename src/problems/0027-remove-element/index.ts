/**
 * 27. Remove Element
 *
 * Removes every occurrence of `val` from `nums` in place, as the problem
 * requires, and returns how many elements are left, `k`. The first `k`
 * elements of `nums` are then the remaining values in their original order;
 * the rest are left as they were.
 *
 * Copies each value that isn't `val` to the next write index.
 *
 * @see https://leetcode.com/problems/remove-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [0, 1, 2, 2, 3, 0, 4, 2];
 * removeElement(nums, 2); // 5, and nums starts [0, 1, 3, 0, 4]
 */
export const removeElement = (nums: number[], val: number): number => {
	let k = 0;

	for (const num of nums) {
		if (num !== val) {
			nums[k] = num;
			k++;
		}
	}

	return k;
};
