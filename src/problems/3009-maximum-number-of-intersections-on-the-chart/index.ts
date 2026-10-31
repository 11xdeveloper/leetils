/**
 * 3009. Maximum Number of Intersections on the Chart
 *
 * A line chart joins the points `(i + 1, y[i])` in order, with no two
 * neighbouring points at the same height. Returns the most points a
 * horizontal line can cross the chart at.
 *
 * Sweep over heights, doubled so the gaps between integers are reachable.
 * Each segment covers the heights between its ends, but leaves out its far
 * end (except for the last segment) so a shared point counts once. The
 * answer is the largest overlap of these ranges.
 *
 * @see https://leetcode.com/problems/maximum-number-of-intersections-on-the-chart/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfIntersectionsOnTheChart([1, 2, 1, 2, 1, 3, 2]); // 5
 */
export const maximumNumberOfIntersectionsOnTheChart = (
	y: readonly number[],
): number => {
	const changes = new Map<number, number>();
	const add = (at: number, delta: number): void => {
		changes.set(at, (changes.get(at) ?? 0) + delta);
	};
	for (let i = 0; i + 1 < y.length; i++) {
		const from = 2 * (y[i] ?? 0);
		let to = 2 * (y[i + 1] ?? 0);
		if (i + 2 < y.length) to += from < to ? -1 : 1;
		add(Math.min(from, to), 1);
		add(Math.max(from, to) + 1, -1);
	}
	let best = 0;
	let current = 0;
	for (const at of [...changes.keys()].sort((a, b) => a - b)) {
		current += changes.get(at) ?? 0;
		best = Math.max(best, current);
	}
	return best;
};
