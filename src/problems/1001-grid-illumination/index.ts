/**
 * 1001. Grid Illumination
 *
 * Lamps on an `n × n` grid light their row, column and both diagonals. For
 * each query cell, reports 1 if it's lit and 0 if not, then turns off every
 * lamp in that cell and its eight neighbours.
 *
 * Counts lamps per row, column, diagonal and anti-diagonal, so checking a
 * cell is four lookups. Lamps are kept in a set so switching one off
 * updates the counts once.
 *
 * @see https://leetcode.com/problems/grid-illumination/
 * @difficulty Hard
 * @timeComplexity O(lamps + queries)
 * @spaceComplexity O(lamps)
 *
 * @example
 * gridIllumination(5, [[0, 0], [4, 4]], [[1, 1], [1, 0]]); // [1, 0]
 */
export const gridIllumination = (
	_n: number,
	lamps: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const on = new Set<string>();
	const counts = [
		new Map<number, number>(),
		new Map<number, number>(),
		new Map<number, number>(),
		new Map<number, number>(),
	];
	const lines = (r: number, c: number): number[] => [r, c, r - c, r + c];
	const adjust = (r: number, c: number, delta: number): void => {
		for (const [i, line] of lines(r, c).entries()) {
			const map = counts[i];
			map?.set(line, (map.get(line) ?? 0) + delta);
		}
	};
	for (const [r = 0, c = 0] of lamps) {
		if (on.has(`${r},${c}`)) continue;
		on.add(`${r},${c}`);
		adjust(r, c, 1);
	}

	return queries.map(([r = 0, c = 0]) => {
		const lit = lines(r, c).some((line, i) => (counts[i]?.get(line) ?? 0) > 0)
			? 1
			: 0;
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				const key = `${r + dr},${c + dc}`;
				if (!on.has(key)) continue;
				on.delete(key);
				adjust(r + dr, c + dc, -1);
			}
		}
		return lit;
	});
};
