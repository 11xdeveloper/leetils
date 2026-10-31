/**
 * 2123. Minimum Operations to Remove Adjacent Ones in Matrix
 *
 * An operation turns a 1 in the binary `grid` into 0. Returns the fewest
 * operations to leave no two 1s sharing an edge.
 *
 * The 1s and their adjacencies form a bipartite graph (by checkerboard
 * colour), and the cells to clear form a minimum vertex cover, which by
 * König's theorem is the size of a maximum matching. Find it with
 * augmenting paths, searched breadth-first.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-remove-adjacent-ones-in-matrix/
 * @difficulty Hard
 * @timeComplexity O(V · E) for V ones and E adjacencies
 * @spaceComplexity O(V)
 *
 * @example
 * minimumOperationsToRemoveAdjacentOnesInMatrix([[1, 1, 0], [0, 1, 1], [1, 1, 1]]); // 3
 */
export const minimumOperationsToRemoveAdjacentOnesInMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const [rows, cols] = [grid.length, grid[0]?.length ?? 0];
	const cells = rows * cols;
	const neighbours = (cell: number): number[] => {
		const [r, c] = [Math.floor(cell / cols), cell % cols];
		return [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		]
			.filter(([nr = 0, nc = 0]) => grid[nr]?.[nc] === 1)
			.map(([nr = 0, nc = 0]) => nr * cols + nc);
	};

	const matchOf = new Int32Array(cells).fill(-1);
	const previous = new Int32Array(cells);
	const visited = new Int32Array(cells).fill(-1);
	let matching = 0;
	for (let start = 0; start < cells; start++) {
		const [r, c] = [Math.floor(start / cols), start % cols];
		if (grid[r]?.[c] !== 1 || (r + c) % 2 || matchOf[start] !== -1) continue;
		// Breadth-first search for an augmenting path from this even cell.
		const queue = [start];
		let end = -1;
		for (let head = 0; head < queue.length && end === -1; head++) {
			const even = queue[head] ?? 0;
			for (const odd of neighbours(even)) {
				if (visited[odd] === start) continue;
				visited[odd] = start;
				previous[odd] = even;
				const partner = matchOf[odd] ?? -1;
				if (partner === -1) {
					end = odd;
					break;
				}
				queue.push(partner);
			}
		}
		if (end === -1) continue;
		matching++;
		for (let odd = end; odd !== -1; ) {
			const even = previous[odd] ?? 0;
			const next = matchOf[even] ?? -1;
			matchOf[even] = odd;
			matchOf[odd] = even;
			odd = next;
		}
	}
	return matching;
};
