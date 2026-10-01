/**
 * 280. Wiggle Sort
 *
 * Reorders `nums` in place, as the problem requires, so that
 * `nums[0] <= nums[1] >= nums[2] <= nums[3] …`.
 *
 * One pass: each neighbouring pair should rise at even positions and fall
 * at odd ones, and swapping a pair that goes the wrong way fixes it without
 * breaking the pair before. No sort is needed.
 *
 * @see https://leetcode.com/problems/wiggle-sort/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [3, 5, 2, 1, 6, 4];
 * wiggleSort(nums); // nums is now [3, 5, 1, 6, 2, 4]
 */
export const wiggleSort = (nums: number[]): void => {
	for (let i = 1; i < nums.length; i++) {
		const previous = nums[i - 1] ?? 0;
		const current = nums[i] ?? 0;
		const shouldRise = i % 2 === 1;
		if (shouldRise ? previous > current : previous < current) {
			nums[i - 1] = current;
			nums[i] = previous;
		}
	}
};
