/**
 * 3501. Maximize Active Section with Trade II
 *
 * For each query `[l, r]`, make at most one trade inside `s[l..r]` (padded
 * with a 1 at each end): turn a block of 1s with 0s on both sides into 0s,
 * then a block of 0s with 1s on both sides into 1s. Returns the most 1s in
 * the whole of `s` afterwards.
 *
 * A trade gains two neighbouring zero blocks inside the range. List the
 * zero blocks; a query clips the first and last blocks it touches to the
 * range, and the pairs fully inside come from a sparse table of
 * neighbouring block sums.
 *
 * @see https://leetcode.com/problems/maximize-active-section-with-trade-ii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * maximizeActiveSectionWithTradeII("01", [[0, 1]]); // [1]
 */
export const maximizeActiveSectionWithTradeII = (
	s: string,
	queries: readonly (readonly number[])[],
): number[] => {
	const ones = [...s].filter((c) => c === "1").length;
	const starts: number[] = [];
	const ends: number[] = [];
	for (let i = 0; i < s.length; ) {
		let j = i;
		while (j < s.length && s[j] === s[i]) j++;
		if (s[i] === "0") {
			starts.push(i);
			ends.push(j - 1);
		}
		i = j;
	}
	const blocks = starts.length;
	const length = (b: number): number => (ends[b] ?? 0) - (starts[b] ?? 0) + 1;
	const table: number[][] = [
		Array.from(
			{ length: Math.max(0, blocks - 1) },
			(_, b) => length(b) + length(b + 1),
		),
	];
	for (let level = 1; 1 << level <= blocks - 1; level++) {
		const previous = table[level - 1] ?? [];
		table.push(
			Array.from({ length: blocks - 1 - (1 << level) + 1 }, (_, b) =>
				Math.max(previous[b] ?? 0, previous[b + (1 << (level - 1))] ?? 0),
			),
		);
	}
	const pairs = (from: number, to: number): number => {
		if (from > to) return 0;
		const level = 31 - Math.clz32(to - from + 1);
		const row = table[level] ?? [];
		return Math.max(row[from] ?? 0, row[to - (1 << level) + 1] ?? 0);
	};
	const firstEndingFrom = (l: number): number => {
		let lo = 0;
		let hi = blocks;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((ends[mid] ?? 0) >= l) hi = mid;
			else lo = mid + 1;
		}
		return lo;
	};
	const lastStartingBy = (r: number): number => {
		let lo = -1;
		let hi = blocks - 1;
		while (lo < hi) {
			const mid = Math.ceil((lo + hi) / 2);
			if ((starts[mid] ?? 0) <= r) lo = mid;
			else hi = mid - 1;
		}
		return lo;
	};
	return queries.map(([l = 0, r = 0]) => {
		const a = firstEndingFrom(l);
		const b = lastStartingBy(r);
		if (b - a < 1) return ones;
		const first = (ends[a] ?? 0) - Math.max(starts[a] ?? 0, l) + 1;
		const last = Math.min(ends[b] ?? 0, r) - (starts[b] ?? 0) + 1;
		if (b === a + 1) return ones + first + last;
		return (
			ones +
			Math.max(first + length(a + 1), length(b - 1) + last, pairs(a + 1, b - 2))
		);
	});
};
