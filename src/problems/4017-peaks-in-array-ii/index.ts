/**
 * 4017. Peaks in Array II
 *
 * A peak subarray, at least three long, contains a peak strictly inside
 * it. Queries `[1, l, r]` count the peak subarrays within `nums[l..r]`;
 * queries `[2, i, v]` set `nums[i]` to v.
 *
 * Count each subarray by its leftmost inner peak q: with p the previous
 * peak (or l), it starts in [p, q) and ends in (q, r], giving
 * (q - p)(r - q). Over the peaks q₁ < … in (l, r), that totals
 * r(q_last - l) - (q₁ - l)q₁ - Σ (q - prev(q))q over the later peaks,
 * where prev(q) is the global previous peak. Fenwick trees hold the peak
 * marks and those (q - prev(q))q terms, refreshed around each update.
 *
 * @see https://leetcode.com/problems/peaks-in-array-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * peaksInArrayII([3, 6, 2, 7, 1], [[1, 1, 3], [2, 3, 0], [1, 0, 4]]); // [0, 3]
 */
export const peaksInArrayII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const values = [...nums];
	const marks = new Float64Array(n + 1);
	const terms = new Float64Array(n + 1);
	const add = (tree: Float64Array, i: number, delta: number): void => {
		for (i++; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const sum = (tree: Float64Array, i: number): number => {
		let total = 0;
		for (; i > 0; i -= i & -i) total += tree[i] ?? 0;
		return total;
	};
	let top = 1;
	while (top * 2 <= n) top *= 2;
	/** Index of the t-th peak (from 1), or -1. */
	const kth = (t: number): number => {
		if (t <= 0 || t > sum(marks, n)) return -1;
		let position = 0;
		for (let step = top; step > 0; step >>= 1)
			if (position + step <= n && (marks[position + step] ?? 0) < t) {
				position += step;
				t -= marks[position] ?? 0;
			}
		return position;
	};
	const isPeak = new Uint8Array(n);
	const term = new Float64Array(n);
	const peakAt = (i: number) =>
		i > 0 &&
		i < n - 1 &&
		(values[i] ?? 0) > (values[i - 1] ?? 0) &&
		(values[i] ?? 0) > (values[i + 1] ?? 0);
	const setTerm = (q: number): void => {
		const before = sum(marks, q);
		const previous = kth(before);
		const value = isPeak[q] && previous >= 0 ? (q - previous) * q : 0;
		add(terms, q, value - (term[q] ?? 0));
		term[q] = value;
	};
	for (let i = 0; i < n; i++)
		if (peakAt(i)) {
			isPeak[i] = 1;
			add(marks, i, 1);
		}
	for (let i = 0; i < n; i++) if (isPeak[i]) setTerm(i);
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0] of queries) {
		if (kind === 2) {
			values[a] = b;
			for (const x of [a - 1, a, a + 1]) {
				if (x < 0 || x >= n) continue;
				const now = peakAt(x) ? 1 : 0;
				if (now === isPeak[x]) continue;
				isPeak[x] = now;
				add(marks, x, now ? 1 : -1);
				// x's own term and the next peak's both depend on x.
				setTerm(x);
				const next = kth(sum(marks, x + 1) + 1);
				if (next >= 0) setTerm(next);
			}
			continue;
		}
		const [l, r] = [a, b];
		const first = kth(sum(marks, l + 1) + 1);
		const last = kth(sum(marks, r));
		if (first < 0 || last < 0 || first > last || first <= l || last >= r) {
			answers.push(0);
			continue;
		}
		const later = sum(terms, last + 1) - sum(terms, first + 1);
		answers.push(r * (last - l) - (first - l) * first - later);
	}
	return answers;
};
