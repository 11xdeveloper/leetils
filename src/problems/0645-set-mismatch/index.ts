/**
 * 645. Set Mismatch
 *
 * `nums` should hold 1 to `n` once each, but one number was replaced by a
 * copy of another. Returns `[duplicated, missing]`.
 *
 * Counts each number, then reads off the one seen twice and the one never
 * seen.
 *
 * @see https://leetcode.com/problems/set-mismatch/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * setMismatch([1, 2, 2, 4]); // [2, 3]
 */
export const setMismatch = (nums: readonly number[]): number[] => {
	const counts = new Uint8Array(nums.length + 1);
	for (const num of nums) counts[num] = (counts[num] ?? 0) + 1;
	return [counts.indexOf(2), counts.indexOf(0, 1)];
};
