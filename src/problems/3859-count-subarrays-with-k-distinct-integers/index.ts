/**
 * 3859. Count Subarrays With K Distinct Integers
 *
 * Counts subarrays with exactly `k` distinct values, each appearing at
 * least `m` times in it.
 *
 * Fix the right end r. Ranking values by their latest occurrence, the
 * starts with exactly k distinct values lie between the (k+1)-th and k-th
 * latest occurrences, found with a Fenwick tree over those positions.
 * Each of those k values also needs its m-th latest occurrence inside, so
 * keep that position at each value's latest occurrence in a segment tree
 * and take the minimum over the range: starts at or before it work.
 *
 * @see https://leetcode.com/problems/count-subarrays-with-k-distinct-integers/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubarraysWithKDistinctIntegers([1, 2, 1, 2, 2], 2, 2); // 2
 */
export const countSubarraysWithKDistinctIntegers = (
	nums: readonly number[],
	k: number,
	m: number,
): number => {
	const n = nums.length;
	const fenwick = new Int32Array(n + 1);
	const toggle = (i: number, delta: number): void => {
		for (i++; i <= n; i += i & -i) fenwick[i] = (fenwick[i] ?? 0) + delta;
	};
	let top = 1;
	while (top * 2 <= n) top *= 2;
	/** Position of the t-th marked index (from 1), smallest first. */
	const kth = (t: number): number => {
		let position = 0;
		for (let step = top; step > 0; step >>= 1)
			if (position + step <= n && (fenwick[position + step] ?? 0) < t) {
				position += step;
				t -= fenwick[position] ?? 0;
			}
		return position;
	};
	let size = 1;
	while (size < n) size *= 2;
	const tree = new Int32Array(2 * size).fill(n);
	const setKey = (i: number, value: number): void => {
		let node = i + size;
		tree[node] = value;
		for (node >>= 1; node > 0; node >>= 1)
			tree[node] = Math.min(tree[2 * node] ?? n, tree[2 * node + 1] ?? n);
	};
	const rangeMin = (from: number, to: number): number => {
		let result = n;
		for (
			let lo = from + size, hi = to + size + 1;
			lo < hi;
			lo >>= 1, hi >>= 1
		) {
			if (lo & 1) result = Math.min(result, tree[lo++] ?? n);
			if (hi & 1) result = Math.min(result, tree[--hi] ?? n);
		}
		return result;
	};
	const occurrences = new Map<number, number[]>();
	let distinct = 0;
	let count = 0;
	nums.forEach((num, r) => {
		const list = occurrences.get(num) ?? [];
		if (list.length > 0) {
			toggle(list.at(-1) ?? 0, -1);
			setKey(list.at(-1) ?? 0, n);
		} else distinct++;
		list.push(r);
		occurrences.set(num, list);
		toggle(r, 1);
		setKey(r, list.length >= m ? (list[list.length - m] ?? 0) : -1);
		if (distinct < k) return;
		const b = kth(distinct - k + 1);
		const a = distinct > k ? kth(distinct - k) + 1 : 0;
		const c = rangeMin(a, r);
		if (c >= a) count += Math.min(b, c) - a + 1;
	});
	return count;
};
