/**
 * 3017. Count the Number of Houses at a Certain Distance II
 *
 * Houses 1 to `n` stand in a row joined by streets, with one extra street
 * between houses `x` and `y`. Returns, for each k from 1 to `n`, how
 * many ordered pairs of houses are k streets apart.
 *
 * Fix the starting house i. The distance to house j is the least of three
 * routes (direct, or via the extra street either way), and between the
 * points i, x and y each route changes linearly in j. So split the houses
 * at those points, and within each part the smallest route is a rising run
 * followed by a falling one, each covering a block of consecutive
 * distances once. Add those blocks to a difference array.
 *
 * @see https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfHousesAtACertainDistanceII(3, 1, 3); // [6, 0, 0]
 */
export const countTheNumberOfHousesAtACertainDistanceII = (
	n: number,
	x: number,
	y: number,
): number[] => {
	const [a, b] = x < y ? [x, y] : [y, x];
	const diff = new Float64Array(n + 2);
	/** Counts each distance from `low` to `high` once. */
	const addRun = (low: number, high: number): void => {
		diff[low] = (diff[low] ?? 0) + 1;
		diff[high + 1] = (diff[high + 1] ?? 0) - 1;
	};
	for (let i = 1; i <= n; i++) {
		const cuts = [...new Set([1, i, a, b])].sort((p, q) => p - q);
		for (let c = 0; c < cuts.length; c++) {
			const from = cuts[c] ?? 1;
			const to = c + 1 < cuts.length ? (cuts[c + 1] ?? 1) - 1 : n;
			if (from > to) continue;
			// Each route as its value at `from` and its slope across the part.
			const routes: [number, number][] = [
				[Math.abs(i - from), from >= i ? 1 : -1],
				[Math.abs(i - a) + 1 + Math.abs(from - b), from >= b ? 1 : -1],
				[Math.abs(i - b) + 1 + Math.abs(from - a), from >= a ? 1 : -1],
			];
			let rising = Number.POSITIVE_INFINITY;
			let falling = Number.POSITIVE_INFINITY;
			for (const [value, slope] of routes)
				if (slope > 0) rising = Math.min(rising, value);
				else falling = Math.min(falling, value);
			const length = to - from + 1;
			// Rising wins while rising + t < falling - t.
			const switchAt = Math.min(
				length,
				Math.max(
					0,
					falling === Number.POSITIVE_INFINITY
						? length
						: Math.ceil((falling - rising) / 2),
				),
			);
			if (switchAt > 0) addRun(rising, rising + switchAt - 1);
			if (switchAt < length) addRun(falling - (length - 1), falling - switchAt);
		}
	}
	const result: number[] = [];
	for (let k = 1, running = diff[0] ?? 0; k <= n; k++) {
		running += diff[k] ?? 0;
		result.push(running);
	}
	return result;
};
