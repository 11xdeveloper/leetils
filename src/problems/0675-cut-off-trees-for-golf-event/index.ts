/**
 * 675. Cut Off Trees for Golf Event
 *
 * In `forest`, 0 is an obstacle, 1 is walkable ground and a larger number is
 * a (walkable) tree of that height, all heights distinct. Starting at the
 * top-left, you must cut the trees in increasing order of height, walking
 * up, down, left or right. Returns the total steps, or -1 if some tree
 * can't be reached.
 *
 * The order is fixed, so it's the sum of shortest walks between
 * consecutive stops, each found with a breadth-first search.
 *
 * @see https://leetcode.com/problems/cut-off-trees-for-golf-event/
 * @difficulty Hard
 * @timeComplexity O(t · m · n) for t trees
 * @spaceComplexity O(m · n)
 *
 * @example
 * cutOffTreesForGolfEvent([[1, 2, 3], [0, 0, 4], [7, 6, 5]]); // 6
 */
export const cutOffTreesForGolfEvent = (
	forest: readonly (readonly number[])[],
): number => {
	const m = forest.length;
	const n = forest[0]?.length ?? 0;
	const trees: [height: number, row: number, col: number][] = [];
	for (const [r, row] of forest.entries()) {
		for (const [c, cell] of row.entries())
			if (cell > 1) trees.push([cell, r, c]);
	}
	trees.sort((a, b) => a[0] - b[0]);

	const distance = (
		fromRow: number,
		fromCol: number,
		toRow: number,
		toCol: number,
	): number => {
		if (fromRow === toRow && fromCol === toCol) return 0;
		const seen = new Uint8Array(m * n);
		seen[fromRow * n + fromCol] = 1;
		let frontier = [[fromRow, fromCol]];
		for (let steps = 1; frontier.length > 0; steps++) {
			const next: number[][] = [];
			for (const [row = 0, col = 0] of frontier) {
				for (const [dr, dc] of [
					[-1, 0],
					[1, 0],
					[0, -1],
					[0, 1],
				] as const) {
					const r = row + dr;
					const c = col + dc;
					if (
						r < 0 ||
						r >= m ||
						c < 0 ||
						c >= n ||
						seen[r * n + c] ||
						forest[r]?.[c] === 0
					)
						continue;
					if (r === toRow && c === toCol) return steps;
					seen[r * n + c] = 1;
					next.push([r, c]);
				}
			}
			frontier = next;
		}
		return -1;
	};

	let total = 0;
	let [row, col] = [0, 0];
	for (const [, treeRow, treeCol] of trees) {
		const steps = distance(row, col, treeRow, treeCol);
		if (steps === -1) return -1;
		total += steps;
		[row, col] = [treeRow, treeCol];
	}
	return total;
};
