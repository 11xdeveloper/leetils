/**
 * 1186. Maximum Subarray Sum with One Deletion
 *
 * Returns the largest sum of a non-empty subarray of `arr` after deleting
 * at most one of its elements (it must stay non-empty).
 *
 * Kadane's algorithm with two states per position: the best sum of a
 * subarray ending here with nothing deleted, and with one element deleted.
 * Deleting the current element leaves the best undeleted subarray ending
 * just before it.
 *
 * @see https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubarraySumWithOneDeletion([1, -2, 0, 3]); // 4
 */
export const maximumSubarraySumWithOneDeletion = (
	arr: readonly number[],
): number => {
	let [kept, deleted, best] = [-Infinity, -Infinity, -Infinity];
	for (const value of arr) {
		deleted = Math.max(deleted + value, kept);
		kept = Math.max(kept + value, value);
		best = Math.max(best, kept, deleted);
	}
	return best;
};
