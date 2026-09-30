/**
 * 803. Bricks Falling When Hit
 *
 * A brick (1) is stable if it's in the top row or next to a stable brick.
 * Each hit erases the brick at a position (if any), and every brick that is
 * no longer stable falls and vanishes. Returns how many bricks fall after
 * each hit.
 *
 * Runs the hits backwards with union–find: first remove every hit brick and
 * connect what's left, with the top row joined to a virtual roof. Then
 * restore the hits in reverse; the bricks newly joined to the roof by a
 * restoration are exactly those that fell when it was hit.
 *
 * @see https://leetcode.com/problems/bricks-falling-when-hit/
 * @difficulty Hard
 * @timeComplexity O((m · n + h) · α(m · n)) for h hits
 * @spaceComplexity O(m · n)
 *
 * @example
 * bricksFallingWhenHit([[1, 0, 0, 0], [1, 1, 1, 0]], [[1, 0]]); // [2]
 */
export const bricksFallingWhenHit = (
	grid: readonly (readonly number[])[],
	hits: readonly (readonly number[])[],
): number[] => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const roof = m * n;
	const cells = grid.map((row) => [...row]);
	const erased = hits.map(([r = 0, c = 0]) => {
		const row = cells[r];
		const wasBrick = row?.[c] === 1;
		if (row) row[c] = 0;
		return wasBrick;
	});

	const parent = Array.from({ length: roof + 1 }, (_, i) => i);
	const size = new Array<number>(roof + 1).fill(1);
	const find = (node: number): number => {
		while (parent[node] !== node) {
			const grandparent = parent[parent[node] ?? node] ?? node;
			parent[node] = grandparent;
			node = grandparent;
		}
		return node;
	};
	const union = (a: number, b: number): void => {
		const [rootA, rootB] = [find(a), find(b)];
		if (rootA === rootB) return;
		parent[rootA] = rootB;
		size[rootB] = (size[rootB] ?? 0) + (size[rootA] ?? 0);
	};
	const connect = (r: number, c: number): void => {
		if (r === 0) union(c, roof);
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			if (cells[r + dr]?.[c + dc] === 1)
				union(r * n + c, (r + dr) * n + c + dc);
		}
	};

	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) if (cells[r]?.[c] === 1) connect(r, c);

	const fallen = new Array<number>(hits.length).fill(0);
	for (let i = hits.length - 1; i >= 0; i--) {
		if (!erased[i]) continue;
		const [r = 0, c = 0] = hits[i] ?? [];
		const before = size[find(roof)] ?? 0;
		const row = cells[r];
		if (row) row[c] = 1;
		connect(r, c);
		fallen[i] = Math.max(0, (size[find(roof)] ?? 0) - before - 1);
	}
	return fallen;
};
