/**
 * 3836. Maximum Score Using Exactly K Pairs
 *
 * Choose exactly `k` pairs (i, j) with increasing indices in both arrays,
 * each scoring `nums1[i] · nums2[j]`. Returns the best total.
 *
 * Dynamic programming over prefixes of both arrays and pairs used: skip
 * an element of either array or pair the two last ones.
 *
 * @see https://leetcode.com/problems/maximum-score-using-exactly-k-pairs/
 * @difficulty Hard
 * @timeComplexity O(n · m · k)
 * @spaceComplexity O(n · m)
 *
 * @example
 * maximumScoreUsingExactlyKPairs([1, 3, 2], [4, 5, 1], 2); // 22
 */
export const maximumScoreUsingExactlyKPairs = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number => {
	const [n, m] = [nums1.length, nums2.length];
	const width = m + 1;
	const NONE = Number.NEGATIVE_INFINITY;
	// layer[i * width + j]: best with the pairs so far using prefixes i and j.
	let layer = new Float64Array((n + 1) * width);
	for (let t = 1; t <= k; t++) {
		const next = new Float64Array((n + 1) * width).fill(NONE);
		for (let i = 1; i <= n; i++)
			for (let j = 1; j <= m; j++) {
				const paired =
					(layer[(i - 1) * width + j - 1] ?? NONE) +
					(nums1[i - 1] ?? 0) * (nums2[j - 1] ?? 0);
				next[i * width + j] = Math.max(
					next[(i - 1) * width + j] ?? NONE,
					next[i * width + j - 1] ?? NONE,
					paired,
				);
			}
		layer = next;
	}
	return layer[n * width + m] ?? 0;
};
