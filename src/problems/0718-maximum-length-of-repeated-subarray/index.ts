/**
 * 718. Maximum Length of Repeated Subarray
 *
 * Returns the length of the longest subarray appearing in both `nums1` and
 * `nums2`.
 *
 * `run[i][j]` is the length of the longest common subarray ending at
 * `nums1[i - 1]` and `nums2[j - 1]`: one more than `run[i - 1][j - 1]` when
 * they match, else 0. Iterating `j` downwards needs only one row.
 *
 * @see https://leetcode.com/problems/maximum-length-of-repeated-subarray/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumLengthOfRepeatedSubarray([1, 2, 3, 2, 1], [3, 2, 1, 4, 7]); // 3: [3, 2, 1]
 */
export const maximumLengthOfRepeatedSubarray = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const run = new Array<number>(nums2.length + 1).fill(0);
	let longest = 0;
	for (const a of nums1) {
		for (let j = nums2.length; j >= 1; j--) {
			run[j] = a === nums2[j - 1] ? (run[j - 1] ?? 0) + 1 : 0;
			longest = Math.max(longest, run[j] ?? 0);
		}
	}
	return longest;
};
