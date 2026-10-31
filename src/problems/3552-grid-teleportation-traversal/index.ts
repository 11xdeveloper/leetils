/**
 * 3552. Grid Teleportation Traversal
 *
 * Walk from the top-left to the bottom-right of the grid, avoiding `#`
 * cells. Stepping on a lettered cell lets you teleport for free to any cell
 * with the same letter, but each letter only once. Returns the fewest
 * steps, or -1.
 *
 * 0-1 breadth-first search: steps cost 1, and the first time a letter is
 * reached, every cell with that letter joins the front of the queue at the
 * same distance.
 *
 * @see https://leetcode.com/problems/grid-teleportation-traversal/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * gridTeleportationTraversal(["A..", ".A.", "..."]); // 2
 */
export const gridTeleportationTraversal = (
	matrix: readonly string[],
): number => {
	const m = matrix.length;
	const n = matrix[0]?.length ?? 0;
	const portals = new Map<string, number[]>();
	matrix.forEach((row, r) => {
		for (let c = 0; c < n; c++) {
			const cell = row.charAt(c);
			if (cell >= "A" && cell <= "Z")
				portals.set(cell, [...(portals.get(cell) ?? []), r * n + c]);
		}
	});
	const distance = new Int32Array(m * n).fill(-1);
	const deque = new Int32Array(2 * m * n + 2);
	let head = m * n + 1;
	let tail = head;
	const best = new Float64Array(m * n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	deque[tail++] = 0;
	const used = new Set<string>();
	while (head < tail) {
		const cell = deque[head++] ?? 0;
		if (distance[cell] !== -1) continue;
		const d = best[cell] ?? 0;
		distance[cell] = d;
		const [r, c] = [Math.floor(cell / n), cell % n];
		const letter = matrix[r]?.charAt(c) ?? "";
		if (letter >= "A" && letter <= "Z" && !used.has(letter)) {
			used.add(letter);
			for (const other of portals.get(letter) ?? [])
				if (distance[other] === -1 && d < (best[other] ?? 0)) {
					best[other] = d;
					deque[--head] = other;
				}
		}
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			const [nr, nc] = [r + dr, c + dc];
			if (nr < 0 || nc < 0 || nr >= m || nc >= n || matrix[nr]?.[nc] === "#")
				continue;
			const next = nr * n + nc;
			if (distance[next] === -1 && d + 1 < (best[next] ?? 0)) {
				best[next] = d + 1;
				deque[tail++] = next;
			}
		}
	}
	return distance[m * n - 1] ?? -1;
};
