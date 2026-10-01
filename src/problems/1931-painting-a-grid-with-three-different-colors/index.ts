/**
 * 1931. Painting a Grid With Three Different Colors
 *
 * Counts the ways to colour an `m × n` grid (`m ≤ 5`) with three colours
 * so no two neighbours match, modulo 10^9 + 7.
 *
 * List the valid colourings of one column, and which pairs may sit side
 * by side; then count column by column.
 *
 * @see https://leetcode.com/problems/painting-a-grid-with-three-different-colors/
 * @difficulty Hard
 * @timeComplexity O(n · S^2) for S ≤ 48 valid columns
 * @spaceComplexity O(S^2)
 *
 * @example
 * paintingAGridWithThreeDifferentColors(1, 2); // 6
 */
export const paintingAGridWithThreeDifferentColors = (
	m: number,
	n: number,
): number => {
	let columns: number[][] = [[]];
	for (let row = 0; row < m; row++) {
		columns = columns.flatMap((column) =>
			[0, 1, 2].filter((c) => c !== column.at(-1)).map((c) => [...column, c]),
		);
	}
	const compatible = columns.map((a) =>
		columns.flatMap((b, j) =>
			a.every((color, i) => color !== b[i]) ? [j] : [],
		),
	);
	let ways = columns.map(() => 1);
	for (let col = 1; col < n; col++) {
		const next = columns.map(() => 0);
		for (const [i, count] of ways.entries()) {
			for (const j of compatible[i] ?? [])
				next[j] = ((next[j] ?? 0) + count) % 1_000_000_007;
		}
		ways = next;
	}
	return ways.reduce((sum, count) => (sum + count) % 1_000_000_007, 0);
};
