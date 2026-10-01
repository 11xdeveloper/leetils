/**
 * 324. Wiggle Sort II
 *
 * Reorders `nums` in place, as the problem requires, so that
 * `nums[0] < nums[1] > nums[2] < nums[3] …`, strictly. A valid order always
 * exists.
 *
 * Sorts a copy, then puts the smaller half at the even positions and the
 * larger half at the odd positions, each in descending order. Taking both
 * halves from the top keeps equal values from ending up next to each other.
 * This is O(n log n); the follow-up's O(n) time with O(1) space needs a
 * linear-time median selection with index remapping.
 *
 * @see https://leetcode.com/problems/wiggle-sort-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * const nums = [1, 5, 1, 1, 6, 4];
 * wiggleSortII(nums); // nums is now [1, 6, 1, 5, 1, 4]
 */
export const wiggleSortII = (nums: number[]): void => {
	const sorted = nums.toSorted((a, b) => a - b);
	const smallerCount = Math.ceil(nums.length / 2);

	for (let i = 0; i < nums.length; i++) {
		nums[i] =
			i % 2 === 0
				? (sorted[smallerCount - 1 - i / 2] ?? 0)
				: (sorted[nums.length - 1 - (i - 1) / 2] ?? 0);
	}
};
