/**
 * 2017. Grid Game
 *
 * Two robots cross a 2 × n grid from the top left to the bottom right,
 * moving right or down. The first collects and clears the points on its
 * path, trying to minimise what the second can then collect; the second
 * maximises it. Returns the second robot's points.
 *
 * If the first robot drops down at column `i`, the second takes the rest
 * of the top row or the start of the bottom row, whichever is more.
 *
 * @see https://leetcode.com/problems/grid-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * gridGame([[2, 5, 4], [1, 5, 1]]); // 4
 */
export const gridGame = (grid: readonly (readonly number[])[]): number => {
	const [top = [], bottom = []] = grid;
	let topRest = top.reduce((sum, v) => sum + v, 0);
	let [bottomStart, best] = [0, Infinity];
	for (const [i, value] of top.entries()) {
		topRest -= value;
		best = Math.min(best, Math.max(topRest, bottomStart));
		bottomStart += bottom[i] ?? 0;
	}
	return best;
};
