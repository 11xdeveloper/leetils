/**
 * 1879. Minimum XOR Sum of Two Arrays
 *
 * Rearranging `nums2` (at most 14 elements), returns the smallest
 * `Σ nums1[i] XOR nums2[i]`.
 *
 * Bitmask dynamic programming: `best[mask]` assigns the first
 * `popcount(mask)` elements of `nums1` to the elements of `nums2` in
 * `mask`.
 *
 * @see https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/
 * @difficulty Hard
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * minimumXorSumOfTwoArrays([1, 0, 3], [5, 3, 4]); // 8
 */
export const minimumXorSumOfTwoArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const n = nums1.length;
	const best = new Array<number>(1 << n).fill(Infinity);
	best[0] = 0;
	for (let mask = 0; mask < (1 << n) - 1; mask++) {
		const current = best[mask] ?? Infinity;
		let assigned = 0;
		for (let bits = mask; bits > 0; bits &= bits - 1) assigned++;
		for (let j = 0; j < n; j++) {
			if (mask & (1 << j)) continue;
			const next = mask | (1 << j);
			best[next] = Math.min(
				best[next] ?? Infinity,
				current + ((nums1[assigned] ?? 0) ^ (nums2[j] ?? 0)),
			);
		}
	}
	return best[(1 << n) - 1] ?? 0;
};
