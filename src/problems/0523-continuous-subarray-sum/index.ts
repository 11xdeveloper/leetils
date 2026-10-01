/**
 * 523. Continuous Subarray Sum
 *
 * Returns whether `nums` has a subarray of at least two elements whose sum
 * is a multiple of `k`.
 *
 * A subarray's sum is a multiple of `k` exactly when the prefix sums before
 * and after it leave the same remainder. It records the first index where
 * each remainder appears, and looks for a repeat at least two indices
 * later.
 *
 * @see https://leetcode.com/problems/continuous-subarray-sum/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(min(n, k))
 *
 * @example
 * continuousSubarraySum([23, 2, 4, 6, 7], 6); // true: 2 + 4 = 6
 */
export const continuousSubarraySum = (
	nums: readonly number[],
	k: number,
): boolean => {
	const firstSeen = new Map([[0, -1]]);
	let remainder = 0;

	for (const [i, num] of nums.entries()) {
		remainder = (remainder + num) % k;
		const first = firstSeen.get(remainder);
		if (first === undefined) firstSeen.set(remainder, i);
		else if (i - first >= 2) return true;
	}

	return false;
};
