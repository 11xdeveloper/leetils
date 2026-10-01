/**
 * 1568. Minimum Number of Days to Disconnect Island
 *
 * Each day one land cell can become water. Returns the fewest days until
 * the grid doesn't have exactly one island.
 *
 * The answer is at most 2: some land cell always has at most two land
 * neighbours (a corner of the island), and removing those cuts it off. So
 * it's 0 if the grid is already disconnected, 1 if removing some single
 * cell disconnects it, and 2 otherwise.
 *
 * @see https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/
 * @difficulty Hard
 * @timeComplexity O((mn)^2)
 * @spaceComplexity O(mn)
 *
 * @example
 * minimumNumberOfDaysToDisconnectIsland([[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]); // 2
 */
export const minimumNumberOfDaysToDisconnectIsland = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const land = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell === 1 ? [r * n + c] : [])),
	);
	const islands = (removed: number) => {
		const seen = new Uint8Array(m * n);
		let count = 0;
		for (const start of land) {
			if (start === removed || seen[start]) continue;
			count++;
			seen[start] = 1;
			const stack = [start];
			for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
				const [r, c] = [Math.floor(cell / n), cell % n];
				for (const [r2, c2] of [
					[r - 1, c],
					[r + 1, c],
					[r, c - 1],
					[r, c + 1],
				] as const) {
					const next = r2 * n + c2;
					if (
						c2 < 0 ||
						c2 >= n ||
						grid[r2]?.[c2] !== 1 ||
						next === removed ||
						seen[next]
					)
						continue;
					seen[next] = 1;
					stack.push(next);
				}
			}
		}
		return count;
	};
	if (islands(-1) !== 1) return 0;
	return land.some((cell) => islands(cell) !== 1) ? 1 : 2;
};
