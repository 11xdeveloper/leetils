/**
 * 305. Number of Islands II
 *
 * Starting from an m×n grid of water, turns the cell at each of `positions`
 * into land in turn, and returns the number of islands (land connected
 * horizontally or vertically) after each step.
 *
 * Union–find over the land cells. Each new cell adds an island, and each
 * union with a neighbouring island that wasn't already connected removes
 * one. Adding the same cell twice changes nothing.
 *
 * @see https://leetcode.com/problems/number-of-islands-ii/
 * @difficulty Hard
 * @timeComplexity O(m * n + k α(m * n)) where k is the number of positions
 * @spaceComplexity O(m * n)
 *
 * @example
 * numberOfIslandsII(3, 3, [[0, 0], [0, 1], [1, 2], [2, 1]]); // [1, 1, 2, 3]
 */
export const numberOfIslandsII = (
	m: number,
	n: number,
	positions: readonly (readonly number[])[],
): number[] => {
	const parent = new Int32Array(m * n).fill(-1); // -1 is water
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};

	let islands = 0;
	return positions.map(([r = 0, c = 0]) => {
		const cell = r * n + c;
		if (parent[cell] !== -1) return islands;
		parent[cell] = cell;
		islands++;

		for (const [nr, nc] of [
			[r + 1, c],
			[r - 1, c],
			[r, c + 1],
			[r, c - 1],
		] as const) {
			if (nr < 0 || nr >= m || nc < 0 || nc >= n || parent[nr * n + nc] === -1)
				continue;
			const a = find(cell);
			const b = find(nr * n + nc);
			if (a !== b) {
				parent[a] = b;
				islands--;
			}
		}
		return islands;
	});
};
