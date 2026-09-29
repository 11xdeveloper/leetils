/**
 * 665. Non-decreasing Array
 *
 * Returns whether `nums` can be made non-decreasing by changing at most one
 * element.
 *
 * At the first drop `nums[i] > nums[i + 1]`, one of the two must change.
 * Lowering `nums[i]` to `nums[i + 1]` is best, unless that would go below
 * `nums[i - 1]`, in which case `nums[i + 1]` is raised to `nums[i]`. It
 * then checks the rest, on a copy, for a second drop.
 *
 * @see https://leetcode.com/problems/non-decreasing-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the copy
 *
 * @example
 * nonDecreasingArray([4, 2, 3]); // true: change 4 to 1
 */
export const nonDecreasingArray = (nums: readonly number[]): boolean => {
	const values = [...nums];
	let changed = false;
	for (let i = 0; i + 1 < values.length; i++) {
		if ((values[i] ?? 0) <= (values[i + 1] ?? 0)) continue;
		if (changed) return false;
		changed = true;
		if (i > 0 && (values[i - 1] ?? 0) > (values[i + 1] ?? 0))
			values[i + 1] = values[i] ?? 0;
		else values[i] = values[i + 1] ?? 0;
	}
	return true;
};
