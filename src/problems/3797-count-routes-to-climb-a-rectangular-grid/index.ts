const MOD = 1_000_000_007;

/**
 * 3797. Count Routes to Climb a Rectangular Grid
 *
 * Routes start on an open cell of the bottom row and end on the top row.
 * Each move goes to an open cell within distance `d`, either along the
 * row or to the row above, and two moves in a row can't both stay on one
 * row. Counts the routes, modulo 1e9+7.
 *
 * Row by row from the bottom: count routes arriving at each cell, then add
 * the routes that make one sideways move within the row (any other open
 * cell within d columns), then move up, where the column can shift by at
 * most ⌊√(d² - 1)⌋. Prefix sums make each window a subtraction.
 *
 * @see https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid/
 * @difficulty Hard
 * @timeComplexity O(n · m)
 * @spaceComplexity O(m)
 *
 * @example
 * countRoutesToClimbARectangularGrid(["..", "#."], 2); // 4
 */
export const countRoutesToClimbARectangularGrid = (
	grid: readonly string[],
	d: number,
): number => {
	const n = grid.length;
	const m = grid[0]?.length ?? 0;
	const reach = Math.floor(Math.sqrt(d * d - 1));
	const open = (r: number, c: number) => grid[r]?.[c] === ".";
	const windowSums = (values: number[], radius: number): number[] => {
		const prefix = [0];
		for (const v of values) prefix.push(((prefix.at(-1) ?? 0) + v) % MOD);
		return values.map((_, c) => {
			const [lo, hi] = [Math.max(0, c - radius), Math.min(m - 1, c + radius)];
			return ((prefix[hi + 1] ?? 0) - (prefix[lo] ?? 0) + MOD) % MOD;
		});
	};
	let arriving = Array.from({ length: m }, (_, c): number =>
		open(n - 1, c) ? 1 : 0,
	);
	for (let r = n - 1; ; r--) {
		const near = windowSums(arriving, d);
		// Arriving routes, plus those taking one sideways move here.
		const here = near.map((count, c) => (open(r, c) ? count : 0));
		if (r === 0) return here.reduce((a, b) => (a + b) % MOD, 0);
		const up = windowSums(here, reach);
		arriving = up.map((count, c) => (open(r - 1, c) ? count : 0));
	}
};
