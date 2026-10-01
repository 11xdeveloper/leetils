/**
 * 1970. Last Day Where You Can Still Cross
 *
 * A `row × col` grid floods one cell per day in the order `cells`
 * (1-indexed). Returns the last day on which land still connects the top
 * row to the bottom row.
 *
 * Run time backwards: un-flood cells from the last day, uniting land with
 * union–find (plus virtual top and bottom nodes) until top meets bottom.
 *
 * @see https://leetcode.com/problems/last-day-where-you-can-still-cross/
 * @difficulty Hard
 * @timeComplexity O(row · col · α)
 * @spaceComplexity O(row · col)
 *
 * @example
 * lastDayWhereYouCanStillCross(2, 2, [[1, 1], [2, 1], [1, 2], [2, 2]]); // 2
 */
export const lastDayWhereYouCanStillCross = (
	row: number,
	col: number,
	cells: readonly (readonly number[])[],
): number => {
	const size = row * col;
	const [top, bottom] = [size, size + 1];
	const parent = Array.from({ length: size + 2 }, (_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	const land = new Uint8Array(size);
	for (let day = cells.length - 1; day >= 0; day--) {
		const [r = 1, c = 1] = cells[day] ?? [];
		const cell = (r - 1) * col + (c - 1);
		land[cell] = 1;
		if (r === 1) parent[find(cell)] = find(top);
		if (r === row) parent[find(cell)] = find(bottom);
		for (const [nr, nc] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			if (
				nr < 1 ||
				nr > row ||
				nc < 1 ||
				nc > col ||
				!land[(nr - 1) * col + (nc - 1)]
			)
				continue;
			parent[find(cell)] = find((nr - 1) * col + (nc - 1));
		}
		if (find(top) === find(bottom)) return day;
	}
	return 0;
};
