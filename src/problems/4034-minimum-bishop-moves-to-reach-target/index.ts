/**
 * 4034. Minimum Bishop Moves to Reach Target
 *
 * The fewest bishop moves from `source` to `target` on an empty 8 × 8
 * board, or -1.
 *
 * Breadth-first search over the 64 squares.
 *
 * @see https://leetcode.com/problems/minimum-bishop-moves-to-reach-target/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumBishopMovesToReachTarget([4, 2], [1, 3]); // 2
 */
export const minimumBishopMovesToReachTarget = (
	source: readonly number[],
	target: readonly number[],
): number => {
	const key = (r: number, c: number) => (r - 1) * 8 + (c - 1);
	const distance = new Int32Array(64).fill(-1);
	const start = key(source[0] ?? 1, source[1] ?? 1);
	distance[start] = 0;
	const queue = [start];
	for (let q = 0; q < queue.length; q++) {
		const cell = queue[q] ?? 0;
		const [r, c] = [Math.floor(cell / 8) + 1, (cell % 8) + 1];
		for (const [dr, dc] of [
			[1, 1],
			[1, -1],
			[-1, 1],
			[-1, -1],
		] as const)
			for (
				let nr = r + dr, nc = c + dc;
				nr >= 1 && nc >= 1 && nr <= 8 && nc <= 8;
				nr += dr, nc += dc
			) {
				const next = key(nr, nc);
				if (distance[next] !== -1) continue;
				distance[next] = (distance[cell] ?? 0) + 1;
				queue.push(next);
			}
	}
	return distance[key(target[0] ?? 1, target[1] ?? 1)] ?? -1;
};
