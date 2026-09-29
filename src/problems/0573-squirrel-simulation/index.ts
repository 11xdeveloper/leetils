/**
 * 573. Squirrel Simulation
 *
 * A squirrel carries nuts to a tree one at a time, moving between grid
 * cells up, down, left or right. Returns the fewest moves to bring every
 * nut to the tree.
 *
 * Every nut costs a round trip from the tree, twice its distance, except
 * the first, which the squirrel reaches from its own position instead. So
 * the answer is the total of the round trips minus the largest saving
 * `distance(tree, nut) - distance(squirrel, nut)` over the possible first
 * nuts. The garden's size doesn't matter, as nothing blocks the way.
 *
 * @see https://leetcode.com/problems/squirrel-simulation/
 * @difficulty Medium
 * @timeComplexity O(n) for n nuts
 * @spaceComplexity O(1)
 *
 * @example
 * squirrelSimulation(5, 7, [2, 2], [4, 4], [[3, 0], [2, 5]]); // 12
 */
export const squirrelSimulation = (
	_height: number,
	_width: number,
	tree: readonly number[],
	squirrel: readonly number[],
	nuts: readonly (readonly number[])[],
): number => {
	const distance = (a: readonly number[], b: readonly number[]): number =>
		Math.abs((a[0] ?? 0) - (b[0] ?? 0)) + Math.abs((a[1] ?? 0) - (b[1] ?? 0));

	let total = 0;
	let bestSaving = Number.NEGATIVE_INFINITY;
	for (const nut of nuts) {
		const toTree = distance(nut, tree);
		total += 2 * toTree;
		bestSaving = Math.max(bestSaving, toTree - distance(nut, squirrel));
	}

	return total - bestSaving;
};
