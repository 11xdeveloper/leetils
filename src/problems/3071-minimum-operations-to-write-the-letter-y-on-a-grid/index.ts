/**
 * 3071. Minimum Operations to Write the Letter Y on a Grid
 *
 * An odd-sized grid of 0s, 1s and 2s. The letter Y is the two diagonals from
 * the top corners to the centre plus the column below it. Returns the
 * fewest cells to change so the Y cells all share one value and the rest
 * all share a different one.
 *
 * Count each value inside and outside the Y, then try all six ordered pairs
 * of distinct values.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-write-the-letter-y-on-a-grid/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToWriteTheLetterYOnAGrid([[1, 2, 2], [1, 1, 0], [0, 1, 0]]); // 3
 */
export const minimumOperationsToWriteTheLetterYOnAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const centre = (n - 1) / 2;
	const inside = [0, 0, 0];
	const outside = [0, 0, 0];
	grid.forEach((row, r) => {
		row.forEach((value, c) => {
			const onY = r <= centre ? c === r || c === n - 1 - r : c === centre;
			const counts = onY ? inside : outside;
			counts[value] = (counts[value] ?? 0) + 1;
		});
	});
	const insideTotal = inside.reduce((a, b) => a + b, 0);
	const outsideTotal = n * n - insideTotal;
	let best = Number.POSITIVE_INFINITY;
	for (let y = 0; y < 3; y++)
		for (let rest = 0; rest < 3; rest++)
			if (y !== rest)
				best = Math.min(
					best,
					insideTotal - (inside[y] ?? 0) + outsideTotal - (outside[rest] ?? 0),
				);
	return best;
};
