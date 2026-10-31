/**
 * 3912. Valid Elements in an Array
 *
 * Keeps, in order, the elements strictly greater than everything to their
 * left or everything to their right (the ends always count).
 *
 * @see https://leetcode.com/problems/valid-elements-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validElementsInAnArray([1, 2, 4, 2, 3, 2]); // [1, 2, 4, 3, 2]
 */
export const validElementsInAnArray = (nums: readonly number[]): number[] => {
	const n = nums.length;
	const rightMax = new Array<number>(n + 1).fill(Number.NEGATIVE_INFINITY);
	for (let i = n - 1; i >= 0; i--)
		rightMax[i] = Math.max(rightMax[i + 1] ?? 0, nums[i] ?? 0);
	let leftMax = Number.NEGATIVE_INFINITY;
	return nums.filter((num, i) => {
		const valid = num > leftMax || num > (rightMax[i + 1] ?? 0);
		leftMax = Math.max(leftMax, num);
		return valid;
	});
};
