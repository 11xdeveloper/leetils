/**
 * 1240. Tiling a Rectangle with the Fewest Squares
 *
 * Returns the fewest integer-sided squares that tile an `n × m` rectangle
 * (both at most 13).
 *
 * Backtracking over a skyline: `filled[c]` is how far column `c` is filled.
 * Each step fills the lowest, leftmost gap with a square, trying the
 * largest that fits first, and abandons any branch that can't beat the best
 * tiling found so far. Unlike cutting the rectangle in two, this finds
 * tilings with no straight cut, like 11 × 13 in 6 squares.
 *
 * @see https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares/
 * @difficulty Hard
 * @timeComplexity O(s^(nm)) for s = min(n, m) in the worst case, but fast in practice for sides up to 13
 * @spaceComplexity O(m)
 *
 * @example
 * tilingARectangleWithTheFewestSquares(11, 13); // 6
 */
export const tilingARectangleWithTheFewestSquares = (
	n: number,
	m: number,
): number => {
	const filled = new Array<number>(m).fill(0);
	let best = n * m;
	const search = (squares: number): void => {
		if (squares >= best) return;
		let column = 0;
		for (let c = 1; c < m; c++) {
			if ((filled[c] ?? 0) < (filled[column] ?? 0)) column = c;
		}
		const height = filled[column] ?? 0;
		if (height === n) {
			best = squares;
			return;
		}
		let width = 0;
		while (column + width < m && filled[column + width] === height) width++;
		for (let side = Math.min(width, n - height); side >= 1; side--) {
			for (let c = column; c < column + side; c++) filled[c] = height + side;
			search(squares + 1);
			for (let c = column; c < column + side; c++) filled[c] = height;
		}
	};
	search(0);
	return best;
};
