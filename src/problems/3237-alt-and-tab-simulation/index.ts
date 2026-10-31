/**
 * 3237. Alt and Tab Simulation
 *
 * Windows are listed from front to back. Each query brings a window to the
 * front. Returns the final order.
 *
 * The most recently queried windows end up at the front, latest first;
 * the others keep their original order behind them.
 *
 * @see https://leetcode.com/problems/alt-and-tab-simulation/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * altAndTabSimulation([1, 2, 3], [3, 3, 2]); // [2, 3, 1]
 */
export const altAndTabSimulation = (
	windows: readonly number[],
	queries: readonly number[],
): number[] => {
	const placed = new Set<number>();
	const order: number[] = [];
	for (const window of [...queries.toReversed(), ...windows])
		if (!placed.has(window)) {
			placed.add(window);
			order.push(window);
		}
	return order;
};
