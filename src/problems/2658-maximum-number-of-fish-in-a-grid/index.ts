/**
 * 2658. Maximum Number of Fish in a Grid
 *
 * Cells with a positive number are water holding that many fish. A
 * fisher starting on water can catch every fish in its connected body of
 * water. Returns the most fish they can catch.
 *
 * Flood-fill each body of water and sum its fish.
 *
 * @see https://leetcode.com/problems/maximum-number-of-fish-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumNumberOfFishInAGrid([[0, 2, 1, 0], [4, 0, 0, 3], [1, 0, 0, 4], [0, 3, 2, 0]]); // 7
 */
export const maximumNumberOfFishInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const fish = grid.map((row) => [...row]);
	let best = 0;
	for (const [r, row] of fish.entries())
		for (const c of row.keys()) {
			let caught = 0;
			const stack: [number, number][] = [[r, c]];
			for (let cell = stack.pop(); cell; cell = stack.pop()) {
				const [i, j] = cell;
				const here = fish[i]?.[j] ?? 0;
				if (here === 0) continue;
				caught += here;
				(fish[i] ?? [])[j] = 0;
				stack.push([i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]);
			}
			best = Math.max(best, caught);
		}
	return best;
};
