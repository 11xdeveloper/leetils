/**
 * 2809. Minimum Time to Make Array Sum At Most x
 *
 * Each second, every `nums1[i]` grows by `nums2[i]`, then you may reset
 * one element to 0. Returns the fewest seconds until the sum of `nums1`
 * is at most `x`, or -1 if it never is.
 *
 * Resetting each index at most once is enough, and the ones reset later
 * should be those that grow fastest. Sort by `nums2` and DP the largest
 * total removed by resetting `j` chosen indices at seconds `1..j`.
 *
 * @see https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToMakeArraySumAtMostX([1, 2, 3], [1, 2, 3], 4); // 3
 */
export const minimumTimeToMakeArraySumAtMostX = (
	nums1: readonly number[],
	nums2: readonly number[],
	x: number,
): number => {
	const n = nums1.length;
	const order = nums1
		.map((_, i) => i)
		.sort((a, b) => (nums2[a] ?? 0) - (nums2[b] ?? 0));
	const removed = Array.from({ length: n + 1 }, () => 0);
	for (const i of order)
		for (let j = n; j >= 1; j--)
			removed[j] = Math.max(
				removed[j] ?? 0,
				(removed[j - 1] ?? 0) + (nums1[i] ?? 0) + j * (nums2[i] ?? 0),
			);
	const sum1 = nums1.reduce((s, v) => s + v, 0);
	const sum2 = nums2.reduce((s, v) => s + v, 0);
	for (let t = 0; t <= n; t++)
		if (sum1 + t * sum2 - (removed[t] ?? 0) <= x) return t;
	return -1;
};
