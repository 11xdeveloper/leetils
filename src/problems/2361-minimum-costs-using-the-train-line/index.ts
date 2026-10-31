/**
 * 2361. Minimum Costs Using the Train Line
 *
 * Stops `0..n` are joined by a regular route (`regular[i]` to go from
 * stop `i` to `i + 1`) and an express route (`express[i]`). Switching to
 * express costs `expressCost`; switching back is free. Starting on the
 * regular route at stop 0, returns the least cost to reach each stop.
 *
 * Track the cheapest arrival at each stop on each route.
 *
 * @see https://leetcode.com/problems/minimum-costs-using-the-train-line/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * minimumCostsUsingTheTrainLine([1, 6, 9, 5], [5, 2, 3, 10], 8); // [1, 7, 14, 19]
 */
export const minimumCostsUsingTheTrainLine = (
	regular: readonly number[],
	express: readonly number[],
	expressCost: number,
): number[] => {
	let [onRegular, onExpress] = [0, expressCost];
	return regular.map((cost, i) => {
		[onRegular, onExpress] = [
			Math.min(onRegular, onExpress) + cost,
			Math.min(onExpress, onRegular + expressCost) + (express[i] ?? 0),
		];
		return Math.min(onRegular, onExpress);
	});
};
