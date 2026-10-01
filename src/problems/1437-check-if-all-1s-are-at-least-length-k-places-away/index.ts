/**
 * 1437. Check If All 1's Are at Least Length K Places Away
 *
 * Returns whether every two 1s in the binary array `nums` have at least `k`
 * 0s between them.
 *
 * Remembers where the last 1 was and checks the gap at each new one.
 *
 * @see https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfAll1sAreAtLeastLengthKPlacesAway([1, 0, 0, 1, 0, 1], 2); // false
 */
export const checkIfAll1sAreAtLeastLengthKPlacesAway = (
	nums: readonly number[],
	k: number,
): boolean => {
	let last = -Infinity;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] !== 1) continue;
		if (i - last - 1 < k) return false;
		last = i;
	}
	return true;
};
