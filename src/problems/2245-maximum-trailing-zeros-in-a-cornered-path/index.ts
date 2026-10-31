/**
 * 2245. Maximum Trailing Zeros in a Cornered Path
 *
 * A cornered path runs straight, then turns at most once. Returns the most
 * trailing zeros of the product of a cornered path's cells.
 *
 * Trailing zeros are the lesser of the factors of 2 and of 5. Extending a
 * path never hurts, so the best paths run from the corner cell to the grid
 * edges; prefix sums along rows and columns give each arm's factors.
 *
 * @see https://leetcode.com/problems/maximum-trailing-zeros-in-a-cornered-path/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumTrailingZerosInACorneredPath([[23, 17, 15, 3, 20], [8, 1, 20, 27, 11], [9, 4, 6, 2, 21], [40, 9, 1, 10, 6], [22, 7, 4, 5, 3]]); // 3
 */
export const maximumTrailingZerosInACorneredPath = (
	grid: readonly (readonly number[])[],
): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const factor = (value: number, p: number): number => {
		let count = 0;
		while (value % p === 0) {
			value /= p;
			count++;
		}
		return count;
	};
	let best = 0;
	// Per prime: each cell's factors with inclusive prefix sums along rows and columns.
	const tables = [2, 5].map((p) => {
		const cell = grid.map((row) => row.map((v) => factor(v, p)));
		const left = cell.map((row) => {
			let sum = 0;
			return row.map((v) => (sum += v));
		});
		const up = cell.map((row) => row.map(() => 0));
		for (let c = 0; c < n; c++) {
			let sum = 0;
			for (let r = 0; r < m; r++) {
				sum += cell[r]?.[c] ?? 0;
				(up[r] ?? [])[c] = sum;
			}
		}
		return { cell, left, up };
	});
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			// Horizontal arms include the corner; vertical arms exclude it.
			const arms = tables.map(({ cell, left, up }) => {
				const here = cell[r]?.[c] ?? 0;
				const toLeft = left[r]?.[c] ?? 0;
				const toRight = (left[r]?.[n - 1] ?? 0) - toLeft + here;
				const above = (up[r]?.[c] ?? 0) - here;
				const below = (up[m - 1]?.[c] ?? 0) - (up[r]?.[c] ?? 0);
				return [
					toLeft + above,
					toLeft + below,
					toRight + above,
					toRight + below,
				];
			});
			const [twos = [], fives = []] = arms;
			for (let k = 0; k < 4; k++)
				best = Math.max(best, Math.min(twos[k] ?? 0, fives[k] ?? 0));
		}
	}
	return best;
};
