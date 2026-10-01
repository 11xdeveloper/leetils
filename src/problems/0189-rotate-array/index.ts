/**
 * 189. Rotate Array
 *
 * Rotates `nums` to the right by `k` steps, in place, as the problem
 * requires.
 *
 * Reversing the whole array, then reversing its first `k` and its remaining
 * elements separately, leaves it rotated. Only `k` modulo the length
 * matters.
 *
 * @see https://leetcode.com/problems/rotate-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const nums = [1, 2, 3, 4, 5, 6, 7];
 * rotateArray(nums, 3); // nums is now [5, 6, 7, 1, 2, 3, 4]
 */
export const rotateArray = (nums: number[], k: number): void => {
	const reverse = (start: number, end: number): void => {
		for (let i = start, j = end; i < j; i++, j--) {
			const temp = nums[i] ?? 0;
			nums[i] = nums[j] ?? 0;
			nums[j] = temp;
		}
	};

	const steps = k % nums.length;
	reverse(0, nums.length - 1);
	reverse(0, steps - 1);
	reverse(steps, nums.length - 1);
};
