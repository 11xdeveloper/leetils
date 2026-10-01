/**
 * 334. Increasing Triplet Subsequence
 *
 * Returns whether `nums` has indices `i < j < k` with
 * `nums[i] < nums[j] < nums[k]`.
 *
 * Tracks the smallest value seen, and the smallest value that has something
 * smaller before it. Any value larger than the second completes a triplet.
 *
 * @see https://leetcode.com/problems/increasing-triplet-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * increasingTripletSubsequence([2, 1, 5, 0, 4, 6]); // true: 0, 4, 6
 */
export const increasingTripletSubsequence = (
	nums: readonly number[],
): boolean => {
	let smallest = Number.POSITIVE_INFINITY;
	let middle = Number.POSITIVE_INFINITY;

	for (const num of nums) {
		if (num <= smallest) smallest = num;
		else if (num <= middle) middle = num;
		else return true;
	}

	return false;
};
