/**
 * 2541. Minimum Operations to Make Array Equal II
 *
 * Each operation adds `k` to one element of `nums1` and subtracts `k`
 * from another. Returns the fewest operations to turn `nums1` into
 * `nums2`, or -1 if it can't be done.
 *
 * Every difference must be a multiple of `k` and they must cancel out;
 * then each operation fixes `k` of the total increase needed.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-equal-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeArrayEqualII([4, 3, 1, 4], [1, 3, 7, 1], 3); // 2
 */
export const minimumOperationsToMakeArrayEqualII = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number => {
	let increase = 0;
	let balance = 0;
	for (let i = 0; i < nums1.length; i++) {
		const difference = (nums2[i] ?? 0) - (nums1[i] ?? 0);
		if (difference === 0) continue;
		if (k === 0 || difference % k !== 0) return -1;
		balance += difference;
		if (difference > 0) increase += difference / k;
	}
	return balance === 0 ? increase : -1;
};
