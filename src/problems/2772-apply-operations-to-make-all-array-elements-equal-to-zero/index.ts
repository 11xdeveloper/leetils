/**
 * 2772. Apply Operations to Make All Array Elements Equal to Zero
 *
 * Each operation subtracts 1 from every element of a length-`k`
 * subarray. Returns whether operations can make every element 0.
 *
 * Left to right, the first element still above zero must be cleared by
 * windows starting there. Track the active subtractions with a
 * difference array.
 *
 * @see https://leetcode.com/problems/apply-operations-to-make-all-array-elements-equal-to-zero/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToMakeAllArrayElementsEqualToZero([2, 2, 3, 1, 1, 0], 3); // true
 */
export const applyOperationsToMakeAllArrayElementsEqualToZero = (
	nums: readonly number[],
	k: number,
): boolean => {
	const n = nums.length;
	const ending = Array.from({ length: n + 1 }, () => 0);
	let active = 0;
	for (let i = 0; i < n; i++) {
		active -= ending[i] ?? 0;
		const left = (nums[i] ?? 0) - active;
		if (left < 0) return false;
		if (left === 0) continue;
		if (i + k > n) return false;
		active += left;
		ending[i + k] = (ending[i + k] ?? 0) + left;
	}
	return true;
};
