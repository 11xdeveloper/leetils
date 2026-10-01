/**
 * 1746. Maximum Subarray Sum After One Operation
 *
 * Replaces exactly one element of `nums` with its square. Returns the
 * largest possible non-empty subarray sum.
 *
 * Kadane's algorithm with two states per end position: the best sum with
 * no element squared yet, and with one already squared.
 *
 * @see https://leetcode.com/problems/maximum-subarray-sum-after-one-operation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumSubarraySumAfterOneOperation([2, -1, -4, -3]); // 17
 */
export const maximumSubarraySumAfterOneOperation = (
	nums: readonly number[],
): number => {
	let [plain, squared, best] = [0, -Infinity, -Infinity];
	for (const num of nums) {
		squared = Math.max(squared + num, plain + num * num);
		plain = Math.max(plain + num, num);
		best = Math.max(best, squared);
		plain = Math.max(plain, 0);
	}
	return best;
};
