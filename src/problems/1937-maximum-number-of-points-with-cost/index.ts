/**
 * 1937. Maximum Number of Points with Cost
 *
 * Pick one cell per row of `points`, scoring the cells minus `|c₁ − c₂|`
 * for the columns picked in each pair of adjacent rows. Returns the best
 * score.
 *
 * Row by row, the best previous value reachable at column `c` is the best
 * of `prev[j] − |c − j|`; one sweep from the left and one from the right
 * compute it for every column.
 *
 * @see https://leetcode.com/problems/maximum-number-of-points-with-cost/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfPointsWithCost([[1, 2, 3], [1, 5, 1], [3, 1, 1]]); // 9
 */
export const maximumNumberOfPointsWithCost = (
	points: readonly (readonly number[])[],
): number => {
	let best = [...(points[0] ?? [])];
	for (const row of points.slice(1)) {
		const n = row.length;
		const reach = new Array<number>(n).fill(-Infinity);
		let running = -Infinity;
		for (let c = 0; c < n; c++) {
			running = Math.max(running - 1, best[c] ?? 0);
			reach[c] = running;
		}
		running = -Infinity;
		for (let c = n - 1; c >= 0; c--) {
			running = Math.max(running - 1, best[c] ?? 0);
			reach[c] = Math.max(reach[c] ?? -Infinity, running);
		}
		best = row.map((value, c) => value + (reach[c] ?? 0));
	}
	return Math.max(...best);
};
