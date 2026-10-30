/**
 * 2983. Palindrome Rearrangement Queries
 *
 * For each query `[a, b, c, d]`, you may rearrange `s[a..b]` in the first
 * half and `s[c..d]` in the second. Returns whether each query can make
 * `s` a palindrome.
 *
 * Compare the first half `x` with the reversed second half `y`, where
 * the second range becomes `[c', d']`. Outside both ranges they must
 * already agree. Inside, letters must balance: when the ranges are
 * disjoint or nested, counts match range by range; when they overlap,
 * each side's free letters must first cover the other side's fixed
 * letters, and what's left must match.
 *
 * @see https://leetcode.com/problems/palindrome-rearrangement-queries/
 * @difficulty Hard
 * @timeComplexity O(26 · (n + q))
 * @spaceComplexity O(26 · n)
 *
 * @example
 * palindromeRearrangementQueries("abcabc", [[1, 1, 3, 5], [0, 2, 5, 5]]); // [true, true]
 */
export const palindromeRearrangementQueries = (
	s: string,
	queries: readonly (readonly number[])[],
): boolean[] => {
	const half = s.length / 2;
	const x = s.slice(0, half);
	const y = [...s.slice(half)].reverse().join("");
	const prefixCounts = (text: string): Int32Array => {
		const counts = new Int32Array((half + 1) * 26);
		for (let i = 0; i < half; i++) {
			for (let c = 0; c < 26; c++)
				counts[(i + 1) * 26 + c] = counts[i * 26 + c] ?? 0;
			const at = (i + 1) * 26 + text.charCodeAt(i) - 97;
			counts[at] = (counts[at] ?? 0) + 1;
		}
		return counts;
	};
	const xCounts = prefixCounts(x);
	const yCounts = prefixCounts(y);
	const mismatches = [0];
	for (let i = 0; i < half; i++)
		mismatches.push(
			(mismatches[i] ?? 0) + (x.charAt(i) === y.charAt(i) ? 0 : 1),
		);

	/** Letter counts of `[from, to]`, or zeros for an empty range. */
	const range = (counts: Int32Array, from: number, to: number): number[] =>
		Array.from({ length: 26 }, (_, c) =>
			to < from
				? 0
				: (counts[(to + 1) * 26 + c] ?? 0) - (counts[from * 26 + c] ?? 0),
		);
	const mismatchesIn = (from: number, to: number): number =>
		to < from ? 0 : (mismatches[to + 1] ?? 0) - (mismatches[from] ?? 0);
	const equal = (p: number[], q: number[]): boolean =>
		p.every((v, i) => v === q[i]);
	const minus = (p: number[], q: number[]): number[] =>
		p.map((v, i) => v - (q[i] ?? 0));

	return queries.map(([a = 0, b = 0, c = 0, d = 0]) => {
		const lo = half * 2 - 1 - d;
		const hi = half * 2 - 1 - c;
		const start = Math.min(a, lo);
		const end = Math.max(b, hi);
		const outside =
			mismatchesIn(0, start - 1) + mismatchesIn(end + 1, half - 1);
		if (b < lo || hi < a) {
			// Disjoint: the gap between them must also already agree.
			const gap =
				b < lo ? mismatchesIn(b + 1, lo - 1) : mismatchesIn(hi + 1, a - 1);
			return (
				outside + gap === 0 &&
				equal(range(xCounts, a, b), range(yCounts, a, b)) &&
				equal(range(xCounts, lo, hi), range(yCounts, lo, hi))
			);
		}
		if (outside > 0) return false;
		if (a <= lo && hi <= b)
			return equal(range(xCounts, a, b), range(yCounts, a, b));
		if (lo <= a && b <= hi)
			return equal(range(xCounts, lo, hi), range(yCounts, lo, hi));
		// Partial overlap: where only one side is free, its letters must
		// supply the other side's fixed ones; what's left must match.
		const xOnly = a < lo ? ([a, lo - 1] as const) : ([hi + 1, b] as const);
		const yOnly = lo < a ? ([lo, a - 1] as const) : ([b + 1, hi] as const);
		const xLeft = minus(
			range(xCounts, a, b),
			range(yCounts, xOnly[0], xOnly[1]),
		);
		const yLeft = minus(
			range(yCounts, lo, hi),
			range(xCounts, yOnly[0], yOnly[1]),
		);
		return (
			xLeft.every((v) => v >= 0) &&
			yLeft.every((v) => v >= 0) &&
			equal(xLeft, yLeft)
		);
	});
};
