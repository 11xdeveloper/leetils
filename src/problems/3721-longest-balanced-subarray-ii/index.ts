/**
 * 3721. Longest Balanced Subarray II
 *
 * A subarray is balanced if it has as many distinct even values as
 * distinct odd ones. Returns the longest balanced length.
 *
 * Sweep the right end r, keeping for every left end l the balance (even
 * minus odd distinct values) of `nums[l..r]` in a segment tree. Adding
 * `nums[r]` changes the balance by ±1 for left ends after its previous
 * occurrence. Neighbouring left ends differ by at most 1, so any range
 * whose minimum and maximum straddle 0 contains a 0, which lets the tree
 * find the leftmost balanced start.
 *
 * @see https://leetcode.com/problems/longest-balanced-subarray-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestBalancedSubarrayII([3, 2, 2, 5, 4]); // 5
 */
export const longestBalancedSubarrayII = (nums: readonly number[]): number => {
	const n = nums.length;
	let size = 1;
	while (size < n) size *= 2;
	const low = new Int32Array(2 * size);
	const high = new Int32Array(2 * size);
	const lazy = new Int32Array(2 * size);
	const add = (
		node: number,
		lo: number,
		hi: number,
		from: number,
		to: number,
		delta: number,
	): void => {
		if (to <= lo || hi <= from) return;
		if (from <= lo && hi <= to) {
			low[node] = (low[node] ?? 0) + delta;
			high[node] = (high[node] ?? 0) + delta;
			lazy[node] = (lazy[node] ?? 0) + delta;
			return;
		}
		const mid = (lo + hi) >>> 1;
		add(2 * node, lo, mid, from, to, delta);
		add(2 * node + 1, mid, hi, from, to, delta);
		low[node] =
			(lazy[node] ?? 0) + Math.min(low[2 * node] ?? 0, low[2 * node + 1] ?? 0);
		high[node] =
			(lazy[node] ?? 0) +
			Math.max(high[2 * node] ?? 0, high[2 * node + 1] ?? 0);
	};
	/** Leftmost index below `limit` whose value is 0, or -1; `offset` is the pending additions above. */
	const leftmostZero = (
		node: number,
		lo: number,
		hi: number,
		limit: number,
		offset: number,
	): number => {
		if (lo >= limit) return -1;
		if ((low[node] ?? 0) + offset > 0 || (high[node] ?? 0) + offset < 0)
			return -1;
		if (hi - lo === 1) return lo;
		const mid = (lo + hi) >>> 1;
		const inner = offset + (lazy[node] ?? 0);
		const left = leftmostZero(2 * node, lo, mid, limit, inner);
		return left >= 0 ? left : leftmostZero(2 * node + 1, mid, hi, limit, inner);
	};
	const last = new Map<number, number>();
	let best = 0;
	nums.forEach((num, r) => {
		const previous = last.get(num) ?? -1;
		add(1, 0, size, previous + 1, r + 1, num % 2 === 0 ? 1 : -1);
		last.set(num, r);
		const l = leftmostZero(1, 0, size, r + 1, 0);
		if (l >= 0) best = Math.max(best, r - l + 1);
	});
	return best;
};
