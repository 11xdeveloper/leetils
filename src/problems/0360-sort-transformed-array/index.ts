/**
 * 360. Sort Transformed Array
 *
 * Applies `f(x) = ax² + bx + c` to every value of the sorted array `nums`
 * and returns the results in ascending order, in linear time.
 *
 * A parabola is monotonic on each side of its vertex, so the largest values
 * (for `a > 0`) or smallest (for `a < 0`) come from the ends of `nums`. Two
 * pointers move in from both ends, filling the result from the back or the
 * front. A line (`a = 0`) works either way.
 *
 * @see https://leetcode.com/problems/sort-transformed-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the result
 *
 * @example
 * sortTransformedArray([-4, -2, 2, 4], 1, 3, 5); // [3, 9, 15, 33]
 */
export const sortTransformedArray = (
	nums: readonly number[],
	a: number,
	b: number,
	c: number,
): number[] => {
	const f = (x: number): number => a * x * x + b * x + c;
	const result = new Array<number>(nums.length).fill(0);
	let left = 0;
	let right = nums.length - 1;

	for (let filled = 0; filled < nums.length; filled++) {
		const fl = f(nums[left] ?? 0);
		const fr = f(nums[right] ?? 0);
		if (a >= 0) {
			// Largest values come from the ends: fill from the back.
			result[nums.length - 1 - filled] = fl > fr ? fl : fr;
			if (fl > fr) left++;
			else right--;
		} else {
			// Smallest values come from the ends: fill from the front.
			result[filled] = fl < fr ? fl : fr;
			if (fl < fr) left++;
			else right--;
		}
	}

	return result;
};
