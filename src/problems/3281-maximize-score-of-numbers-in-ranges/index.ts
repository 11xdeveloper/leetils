/**
 * 3281. Maximize Score of Numbers in Ranges
 *
 * Pick one integer from each range `[start[i], start[i] + d]`. Returns the
 * largest possible smallest difference between two picks.
 *
 * Binary search on the gap: going through the ranges by start, pick each
 * number as low as possible but at least the gap above the last pick.
 *
 * @see https://leetcode.com/problems/maximize-score-of-numbers-in-ranges/
 * @difficulty Medium
 * @timeComplexity O(n log n + n log(max + d))
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeScoreOfNumbersInRanges([6, 0, 3], 2); // 4
 */
export const maximizeScoreOfNumbersInRanges = (
	start: readonly number[],
	d: number,
): number => {
	const sorted = start.toSorted((a, b) => a - b);
	const fits = (gap: number): boolean => {
		let last = Number.NEGATIVE_INFINITY;
		for (const low of sorted) {
			const pick = Math.max(low, last + gap);
			if (pick > low + d) return false;
			last = pick;
		}
		return true;
	};
	let lo = 0;
	let hi =
		Math.ceil(
			((sorted.at(-1) ?? 0) + d - (sorted[0] ?? 0)) /
				Math.max(1, sorted.length - 1),
		) + 1;
	while (lo < hi) {
		const mid = Math.ceil((lo + hi) / 2);
		if (fits(mid)) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
