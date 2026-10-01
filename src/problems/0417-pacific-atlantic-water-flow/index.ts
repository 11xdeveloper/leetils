/**
 * 417. Pacific Atlantic Water Flow
 *
 * An island's cell heights are given; the Pacific touches its top and left
 * edges, the Atlantic its bottom and right. Water flows to a neighbouring
 * cell of equal or lower height. Returns every cell `[r, c]` from which
 * water can reach both oceans.
 *
 * Works backwards from each ocean: a breadth-first search from its edge
 * cells climbs to neighbours of equal or greater height, finding every cell
 * that drains into it. The answer is the cells both searches reach.
 *
 * @see https://leetcode.com/problems/pacific-atlantic-water-flow/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * pacificAtlanticWaterFlow([[1, 2], [4, 3]]); // [[0, 1], [1, 0], [1, 1]]
 */
export const pacificAtlanticWaterFlow = (
	heights: readonly (readonly number[])[],
): number[][] => {
	const rows = heights.length;
	const columns = heights[0]?.length ?? 0;

	const drainsTo = (starts: [number, number][]): Uint8Array => {
		const reached = new Uint8Array(rows * columns);
		for (const [r, c] of starts) reached[r * columns + c] = 1;
		const queue = [...starts];
		for (let head = 0; head < queue.length; head++) {
			const [r, c] = queue[head] ?? [0, 0];
			const height = heights[r]?.[c] ?? 0;
			for (const [nr, nc] of [
				[r + 1, c],
				[r - 1, c],
				[r, c + 1],
				[r, c - 1],
			] as const) {
				if (
					nr < 0 ||
					nr >= rows ||
					nc < 0 ||
					nc >= columns ||
					reached[nr * columns + nc] === 1
				)
					continue;
				if ((heights[nr]?.[nc] ?? 0) < height) continue;
				reached[nr * columns + nc] = 1;
				queue.push([nr, nc]);
			}
		}
		return reached;
	};

	const edges = (pacific: boolean): [number, number][] => {
		const cells: [number, number][] = [];
		for (let r = 0; r < rows; r++) cells.push([r, pacific ? 0 : columns - 1]);
		for (let c = 0; c < columns; c++) cells.push([pacific ? 0 : rows - 1, c]);
		return cells;
	};

	const pacific = drainsTo(edges(true));
	const atlantic = drainsTo(edges(false));
	const cells: number[][] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (pacific[r * columns + c] === 1 && atlantic[r * columns + c] === 1)
				cells.push([r, c]);
		}
	}
	return cells;
};
