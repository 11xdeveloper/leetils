/**
 * 2425. Bitwise XOR of All Pairings
 *
 * Returns the XOR of `a ^ b` over every pair from `nums1` and `nums2`.
 *
 * Each element of `nums1` appears once per element of `nums2`, so it
 * survives only if `nums2` has odd length, and vice versa.
 *
 * @see https://leetcode.com/problems/bitwise-xor-of-all-pairings/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * bitwiseXorOfAllPairings([2, 1, 3], [10, 2, 5, 0]); // 13
 */
export const bitwiseXorOfAllPairings = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const xor = (nums: readonly number[]): number =>
		nums.reduce((x, v) => x ^ v, 0);
	return (
		(nums2.length % 2 ? xor(nums1) : 0) ^ (nums1.length % 2 ? xor(nums2) : 0)
	);
};
