/**
 * 2033. Minimum Operations to Make a Uni-Value Grid
 *
 * An operation adds or subtracts `x` from one cell. Returns the fewest
 * operations to make every cell equal, or -1 if impossible.
 *
 * All cells must agree mod `x`. Moving every value to the median
 * minimises the total distance.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/
 * @difficulty Medium
 * @timeComplexity O(mn log mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * minimumOperationsToMakeAUniValueGrid([[2, 4], [6, 8]], 2); // 4
 */
export const minimumOperationsToMakeAUniValueGrid = (
	grid: readonly (readonly number[])[],
	x: number,
): number => {
	const values = grid.flat().sort((a, b) => a - b);
	const median = values[values.length >> 1] ?? 0;
	let operations = 0;
	for (const value of values) {
		const distance = Math.abs(value - median);
		if (distance % x) return -1;
		operations += distance / x;
	}
	return operations;
};
