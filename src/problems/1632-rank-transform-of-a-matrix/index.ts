/**
 * 1632. Rank Transform of a Matrix
 *
 * Returns the smallest positive ranks for `matrix` that order the elements
 * of every row and every column the same way their values do.
 *
 * Process the values in increasing order. Equal values sharing a row or
 * column must share a rank, so group them with union–find (linking each
 * cell's row to its column). Each group takes one more than the highest
 * rank already in any of its rows or columns, and then raises those.
 *
 * @see https://leetcode.com/problems/rank-transform-of-a-matrix/
 * @difficulty Hard
 * @timeComplexity O(mn log mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * rankTransformOfAMatrix([[1, 2], [3, 4]]); // [[1, 2], [2, 3]]
 */
export const rankTransformOfAMatrix = (
	matrix: readonly (readonly number[])[],
): number[][] => {
	const [rows, cols] = [matrix.length, matrix[0]?.length ?? 0];
	const answer = Array.from({ length: rows }, () =>
		new Array<number>(cols).fill(0),
	);
	const byValue = new Map<number, [row: number, col: number][]>();
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const value = matrix[r]?.[c] ?? 0;
			const cells = byValue.get(value) ?? [];
			cells.push([r, c]);
			byValue.set(value, cells);
		}
	}
	// Highest rank so far in each row (indices 0 … rows − 1) and column (rows …).
	const highest = new Array<number>(rows + cols).fill(0);
	const parent = new Map<number, number>();
	const find = (x: number) => {
		let root = x;
		while (parent.get(root) !== root) root = parent.get(root) ?? root;
		for (let node = x; node !== root; ) {
			const next = parent.get(node) ?? root;
			parent.set(node, root);
			node = next;
		}
		return root;
	};
	for (const value of [...byValue.keys()].sort((a, b) => a - b)) {
		const cells = byValue.get(value) ?? [];
		parent.clear();
		for (const [r, c] of cells) {
			for (const line of [r, rows + c])
				if (!parent.has(line)) parent.set(line, line);
			parent.set(find(r), find(rows + c));
		}
		const rank = new Map<number, number>();
		for (const line of parent.keys()) {
			const root = find(line);
			rank.set(root, Math.max(rank.get(root) ?? 0, (highest[line] ?? 0) + 1));
		}
		for (const [r, c] of cells) {
			const row = answer[r];
			if (row) row[c] = rank.get(find(r)) ?? 1;
		}
		for (const line of parent.keys()) highest[line] = rank.get(find(line)) ?? 0;
	}
	return answer;
};
