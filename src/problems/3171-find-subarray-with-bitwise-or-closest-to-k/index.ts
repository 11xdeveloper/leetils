/**
 * 3171. Find Subarray With Bitwise OR Closest to K
 *
 * The smallest |k - OR| over the bitwise ORs of all subarrays of `nums`.
 *
 * The ORs of subarrays ending at an index take at most ~30 distinct values,
 * since each one adds bits. Carry that set along, ORing in each new
 * element.
 *
 * @see https://leetcode.com/problems/find-subarray-with-bitwise-or-closest-to-k/
 * @difficulty Hard
 * @timeComplexity O(n log max)
 * @spaceComplexity O(log max)
 *
 * @example
 * findSubarrayWithBitwiseOrClosestToK([1, 2, 4, 5], 3); // 0
 */
export const findSubarrayWithBitwiseOrClosestToK = (
	nums: readonly number[],
	k: number,
): number => {
	let ending = new Set<number>();
	let best = Number.POSITIVE_INFINITY;
	for (const num of nums) {
		const next = new Set([num]);
		for (const or of ending) next.add(or | num);
		for (const or of next) best = Math.min(best, Math.abs(k - or));
		ending = next;
	}
	return best;
};
