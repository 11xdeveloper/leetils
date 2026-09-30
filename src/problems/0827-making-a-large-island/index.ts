/**
 * 827. Making A Large Island
 *
 * Changes at most one 0 in the `n × n` binary `grid` to 1 and returns the
 * largest island (4-directionally connected 1s) possible.
 *
 * Labels every island and records its size. Flipping a 0 joins it to the
 * distinct islands around it, so the best flip adds up to four island
 * sizes plus one. A grid with no 0 is one island of `n²`.
 *
 * @see https://leetcode.com/problems/making-a-large-island/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * makingALargeIsland([[1, 0], [0, 1]]); // 3
 */
export const makingALargeIsland = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid.length;
	const label = new Int32Array(n * n).fill(-1);
	const sizes: number[] = [];
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	] as const;

	for (let start = 0; start < n * n; start++) {
		if (label[start] !== -1 || grid[Math.floor(start / n)]?.[start % n] !== 1)
			continue;
		const id = sizes.length;
		label[start] = id;
		const stack = [start];
		let size = 0;
		for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
			size++;
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [dr, dc] of directions) {
				const [r2, c2] = [r + dr, c + dc];
				if (grid[r2]?.[c2] !== 1 || label[r2 * n + c2] !== -1) continue;
				label[r2 * n + c2] = id;
				stack.push(r2 * n + c2);
			}
		}
		sizes.push(size);
	}

	let best = Math.max(0, ...sizes);
	for (let cell = 0; cell < n * n; cell++) {
		if (grid[Math.floor(cell / n)]?.[cell % n] !== 0) continue;
		const [r, c] = [Math.floor(cell / n), cell % n];
		const touching = new Set<number>();
		for (const [dr, dc] of directions) {
			const [r2, c2] = [r + dr, c + dc];
			if (
				r2 >= 0 &&
				r2 < n &&
				c2 >= 0 &&
				c2 < n &&
				(label[r2 * n + c2] ?? -1) >= 0
			)
				touching.add(label[r2 * n + c2] ?? 0);
		}
		let size = 1;
		for (const id of touching) size += sizes[id] ?? 0;
		best = Math.max(best, size);
	}
	return best;
};
