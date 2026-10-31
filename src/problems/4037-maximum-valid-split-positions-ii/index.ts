/**
 * 4037. Maximum Valid Split Positions II
 *
 * After removing at most one element, a split position is valid when the
 * gcd of the part before it equals the gcd of the part after. Returns the
 * most valid split positions possible.
 *
 * Equal halves both equal the whole array's gcd G, and a running gcd only
 * drops, so the valid splits are those after prefixes reach G and before
 * suffixes stop being G. For each removal j, G' = gcd(prefix before j,
 * suffix after j); find where the new prefix gcd first reaches G' and
 * where the new suffix gcd last is G', binary searching with a sparse
 * table of range gcds, and count the splits between.
 *
 * @see https://leetcode.com/problems/maximum-valid-split-positions-ii/
 * @difficulty Hard
 * @timeComplexity O(n log² n · log V)
 * @spaceComplexity O(n log n)
 *
 * @example
 * maximumValidSplitPositionsII([10, 30, 15, 10]); // 2
 */
export const maximumValidSplitPositionsII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const table: number[][] = [[...nums]];
	for (let level = 1; 1 << level <= n; level++) {
		const previous = table[level - 1] ?? [];
		const half = 1 << (level - 1);
		table.push(
			Array.from({ length: n - (1 << level) + 1 }, (_, i) =>
				gcd(previous[i] ?? 0, previous[i + half] ?? 0),
			),
		);
	}
	/** gcd of nums[from..to], 0 when empty. */
	const range = (from: number, to: number): number => {
		if (from > to) return 0;
		const level = 31 - Math.clz32(to - from + 1);
		return gcd(
			table[level]?.[from] ?? 0,
			table[level]?.[to - (1 << level) + 1] ?? 0,
		);
	};
	/** Valid splits of nums with index `skip` removed (-1 for none). */
	const score = (skip: number): number => {
		const index = (i: number) => (skip >= 0 && i >= skip ? i + 1 : i);
		const m = skip >= 0 ? n - 1 : n;
		if (m < 2) return 0;
		const whole =
			skip >= 0
				? gcd(range(0, skip - 1), range(skip + 1, n - 1))
				: range(0, n - 1);
		const prefixGcd = (i: number) =>
			skip >= 0 && i >= skip
				? gcd(range(0, skip - 1), range(skip + 1, i + 1))
				: range(0, i);
		const suffixGcd = (t: number) =>
			skip >= 0 && t < skip
				? gcd(range(t, skip - 1), range(skip + 1, n - 1))
				: range(index(t), n - 1);
		// Smallest i whose prefix gcd is the whole gcd.
		let [lo, hi] = [0, m - 1];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if (prefixGcd(mid) === whole) hi = mid;
			else lo = mid + 1;
		}
		const first = lo;
		// Largest t whose suffix gcd is the whole gcd.
		[lo, hi] = [0, m - 1];
		while (lo < hi) {
			const mid = (lo + hi + 1) >>> 1;
			if (suffixGcd(mid) === whole) lo = mid;
			else hi = mid - 1;
		}
		return Math.max(0, lo - first);
	};
	let best = score(-1);
	for (let skip = 0; skip < n; skip++) best = Math.max(best, score(skip));
	return best;
};
