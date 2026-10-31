/**
 * 3940. Limit Occurrences in Sorted Array
 *
 * Keeps at most `k` copies of each value of the sorted `nums`, in order.
 *
 * @see https://leetcode.com/problems/limit-occurrences-in-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * limitOccurrencesInSortedArray([1, 1, 1, 2, 2, 3], 2); // [1, 1, 2, 2, 3]
 */
export const limitOccurrencesInSortedArray = (
	nums: readonly number[],
	k: number,
): number[] => nums.filter((num, i) => i < k || nums[i - k] !== num);
