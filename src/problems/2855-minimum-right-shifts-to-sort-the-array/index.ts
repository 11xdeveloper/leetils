/**
 * 2855. Minimum Right Shifts to Sort the Array
 *
 * A right shift moves every element of `nums`, whose values are distinct,
 * one place right, the last wrapping to the front. Returns the fewest
 * shifts that sort it, or -1.
 *
 * A rotated sorted array has at most one descent around the circle; the
 * elements after it must move to the front.
 *
 * @see https://leetcode.com/problems/minimum-right-shifts-to-sort-the-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumRightShiftsToSortTheArray([3, 4, 5, 1, 2]); // 2
 */
export const minimumRightShiftsToSortTheArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	let descent = -1;
	for (let i = 0; i < n; i++)
		if ((nums[i] ?? 0) > (nums[(i + 1) % n] ?? 0)) {
			if (descent !== -1) return n === 1 ? 0 : -1;
			descent = i;
		}
	return descent === -1 ? 0 : (n - 1 - descent) % n;
};
