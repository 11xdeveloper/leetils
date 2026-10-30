/**
 * 2680. Maximum OR
 *
 * Each of `k` operations doubles one element. Returns the largest
 * possible bitwise OR of the whole array.
 *
 * All doublings should go to the same element, to push its top bit
 * highest. Try each element, ORing it shifted with the OR of everything
 * else from prefix and suffix ORs. Values pass 32 bits, so use BigInt.
 *
 * @see https://leetcode.com/problems/maximum-or/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumOr([8, 1, 2], 2); // 35
 */
export const maximumOr = (nums: readonly number[], k: number): number => {
	const values = nums.map(BigInt);
	const n = values.length;
	const suffix = Array.from({ length: n + 1 }, () => 0n);
	for (let i = n - 1; i >= 0; i--)
		suffix[i] = (suffix[i + 1] ?? 0n) | (values[i] ?? 0n);
	let prefix = 0n;
	let best = 0n;
	for (let i = 0; i < n; i++) {
		const value = values[i] ?? 0n;
		const candidate = prefix | (value << BigInt(k)) | (suffix[i + 1] ?? 0n);
		if (candidate > best) best = candidate;
		prefix |= value;
	}
	return Number(best);
};
