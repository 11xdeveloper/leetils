/**
 * 3768. Minimum Inversion Count in Subarrays of Fixed Length
 *
 * The fewest inversions (pairs out of order) in any window of `k`
 * consecutive elements.
 *
 * Slide the window with a Fenwick tree over value ranks: dropping the
 * left element loses the inversions it starts, the smaller values left in
 * the window; adding the right one gains the larger values before it.
 *
 * @see https://leetcode.com/problems/minimum-inversion-count-in-subarrays-of-fixed-length/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumInversionCountInSubarraysOfFixedLength([5, 3, 2, 1], 4); // 6
 */
export const minimumInversionCountInSubarraysOfFixedLength = (
	nums: readonly number[],
	k: number,
): number => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((v, i) => [v, i + 1]));
	const m = values.length;
	const tree = new Int32Array(m + 1);
	const update = (i: number, delta: number): void => {
		for (; i <= m; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const prefix = (i: number): number => {
		let total = 0;
		for (; i > 0; i -= i & -i) total += tree[i] ?? 0;
		return total;
	};
	let inversions = 0;
	let best = Number.POSITIVE_INFINITY;
	nums.forEach((num, i) => {
		const r = rank.get(num) ?? 1;
		if (i >= k) {
			const old = rank.get(nums[i - k] ?? 0) ?? 1;
			update(old, -1);
			inversions -= prefix(old - 1);
		}
		inversions += Math.min(i, k - 1) - prefix(r);
		update(r, 1);
		if (i >= k - 1) best = Math.min(best, inversions);
	});
	return best;
};
