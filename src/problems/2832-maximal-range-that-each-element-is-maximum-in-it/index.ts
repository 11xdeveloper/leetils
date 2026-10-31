/**
 * 2832. Maximal Range That Each Element Is Maximum in It
 *
 * For each element of `nums`, whose values are distinct, returns the
 * length of the longest subarray in which it is the maximum.
 *
 * A monotonic stack finds the nearest larger element on each side.
 *
 * @see https://leetcode.com/problems/maximal-range-that-each-element-is-maximum-in-it/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximalRangeThatEachElementIsMaximumInIt([1, 5, 4, 3, 6]); // [1, 4, 2, 1, 5]
 */
export const maximalRangeThatEachElementIsMaximumInIt = (
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const left = nums.map(() => -1);
	const right = nums.map(() => n);
	const stack: number[] = [];
	for (const [i, num] of nums.entries()) {
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) < num)
			right[stack.pop() ?? 0] = i;
		left[i] = stack.at(-1) ?? -1;
		stack.push(i);
	}
	return nums.map((_, i) => (right[i] ?? n) - (left[i] ?? -1) - 1);
};
