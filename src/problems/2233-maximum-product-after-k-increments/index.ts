import { Heap } from "../../internal/heap";

/**
 * 2233. Maximum Product After K Increments
 *
 * An operation increments one number. Returns the largest product of
 * `nums` after at most `k` operations, modulo 10^9 + 7.
 *
 * Incrementing the smallest number always multiplies the product most.
 *
 * @see https://leetcode.com/problems/maximum-product-after-k-increments/
 * @difficulty Medium
 * @timeComplexity O((n + k) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductAfterKIncrements([6, 3, 3, 2], 2); // 216
 */
export const maximumProductAfterKIncrements = (
	nums: readonly number[],
	k: number,
): number => {
	const MOD = 1_000_000_007;
	const heap = new Heap<number>((a, b) => a - b, nums);
	for (let i = 0; i < k; i++) heap.push((heap.pop() ?? 0) + 1);
	let product = 1;
	// Factors are at most about 10^6, so each product stays below 2^53.
	for (let num = heap.pop(); num !== undefined; num = heap.pop())
		product = (product * num) % MOD;
	return product;
};
