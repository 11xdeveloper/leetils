/**
 * 2850. Minimum Moves to Spread Stones Over Grid
 *
 * Nine stones lie on a 3 × 3 grid. Each move shifts one stone to a
 * neighbouring cell. Returns the fewest moves to leave one stone in every
 * cell.
 *
 * Pair each surplus stone with an empty cell; a stone travels its
 * Manhattan distance. Try every pairing of the at most 8 surplus stones.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid/
 * @difficulty Medium
 * @timeComplexity O(8!)
 * @spaceComplexity O(9)
 *
 * @example
 * minimumMovesToSpreadStonesOverGrid([[1, 3, 0], [1, 0, 0], [1, 0, 3]]); // 4
 */
export const minimumMovesToSpreadStonesOverGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const extra: [number, number][] = [];
	const empty: [number, number][] = [];
	for (const [r, row] of grid.entries())
		for (const [c, stones] of row.entries()) {
			if (stones === 0) empty.push([r, c]);
			for (let s = 1; s < stones; s++) extra.push([r, c]);
		}
	const used = empty.map(() => false);
	const assign = (i: number): number => {
		if (i === extra.length) return 0;
		const [r, c] = extra[i] ?? [0, 0];
		let best = Number.POSITIVE_INFINITY;
		for (const [j, [er, ec]] of empty.entries()) {
			if (used[j]) continue;
			used[j] = true;
			best = Math.min(
				best,
				Math.abs(r - er) + Math.abs(c - ec) + assign(i + 1),
			);
			used[j] = false;
		}
		return best;
	};
	return assign(0);
};
