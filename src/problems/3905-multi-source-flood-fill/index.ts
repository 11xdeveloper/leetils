/**
 * 3905. Multi Source Flood Fill
 *
 * Coloured `sources` spread to uncoloured neighbours each step, all at
 * once; a cell reached by several colours in the same step takes the
 * largest. Returns the final grid.
 *
 * Breadth-first search one layer at a time, settling each new cell's
 * colour only after the whole layer has offered theirs.
 *
 * @see https://leetcode.com/problems/multi-source-flood-fill/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * multiSourceFloodFill(3, 3, [[0, 1, 3], [1, 1, 5]]); // [[3, 3, 3], [5, 5, 5], [5, 5, 5]]
 */
export const multiSourceFloodFill = (
	n: number,
	m: number,
	sources: readonly (readonly number[])[],
): number[][] => {
	const color = new Int32Array(n * m);
	let frontier: number[] = [];
	for (const [r = 0, c = 0, value = 0] of sources) {
		color[r * m + c] = value;
		frontier.push(r * m + c);
	}
	while (frontier.length > 0) {
		const offers = new Map<number, number>();
		for (const cell of frontier) {
			const [r, c] = [Math.floor(cell / m), cell % m];
			for (const [nr, nc] of [
				[r + 1, c],
				[r - 1, c],
				[r, c + 1],
				[r, c - 1],
			] as const) {
				if (nr < 0 || nc < 0 || nr >= n || nc >= m || color[nr * m + nc])
					continue;
				const to = nr * m + nc;
				offers.set(to, Math.max(offers.get(to) ?? 0, color[cell] ?? 0));
			}
		}
		for (const [cell, value] of offers) color[cell] = value;
		frontier = [...offers.keys()];
	}
	return Array.from({ length: n }, (_, r) =>
		Array.from(color.subarray(r * m, r * m + m)),
	);
};
