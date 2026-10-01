/**
 * 1856. Maximum Subarray Min-Product
 *
 * A subarray's min-product is its minimum times its sum. Returns the
 * largest min-product, modulo 10^9 + 7 (after maximising).
 *
 * For each element as the minimum, the best subarray stretches to the
 * nearest smaller elements on each side, found with a monotonic stack;
 * prefix sums give its sum. Products can exceed 2^53, so compare them as
 * BigInt.
 *
 * @see https://leetcode.com/problems/maximum-subarray-min-product/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSubarrayMinProduct([3, 1, 5, 6, 4, 2]); // 60
 */
export const maximumSubarrayMinProduct = (nums: readonly number[]): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const stack: number[] = [];
	let best = 0n;
	// Popping index i at position `end` means nums[end] is smaller, closing i's range.
	for (let end = 0; end <= n; end++) {
		const value = end < n ? (nums[end] ?? 0) : -1;
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) > value) {
			const i = stack.pop() ?? 0;
			const start = (stack.at(-1) ?? -1) + 1;
			const product =
				BigInt(nums[i] ?? 0) *
				BigInt((prefix[end] ?? 0) - (prefix[start] ?? 0));
			if (product > best) best = product;
		}
		stack.push(end);
	}
	return Number(best % 1_000_000_007n);
};
