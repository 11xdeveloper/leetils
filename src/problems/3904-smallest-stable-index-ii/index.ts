/**
 * 3904. Smallest Stable Index II
 *
 * Index i is stable when the maximum of `nums[0..i]` minus the minimum
 * of `nums[i..]` is at most `k`. Returns the first stable index, or -1.
 *
 * Suffix minima, then a sweep with the running maximum.
 *
 * @see https://leetcode.com/problems/smallest-stable-index-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestStableIndexII([5, 0, 1, 4], 3); // 3
 */
export const smallestStableIndexII = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const suffixMin = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	for (let i = n - 1; i >= 0; i--)
		suffixMin[i] = Math.min(suffixMin[i + 1] ?? 0, nums[i] ?? 0);
	let prefixMax = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < n; i++) {
		prefixMax = Math.max(prefixMax, nums[i] ?? 0);
		if (prefixMax - (suffixMin[i] ?? 0) <= k) return i;
	}
	return -1;
};
