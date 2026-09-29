/**
 * 256. Paint House
 *
 * Returns the lowest cost to paint a row of houses red, blue or green, where
 * `costs[i][c]` is the cost of painting house `i` with colour `c`, and no
 * two neighbouring houses share a colour.
 *
 * Dynamic programming over the houses: the cheapest way to end on a colour
 * adds that colour's cost to the cheaper of the other two colours' totals
 * for the house before.
 *
 * @see https://leetcode.com/problems/paint-house/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * paintHouse([[17, 2, 17], [16, 16, 5], [14, 3, 19]]); // 10: blue, green, blue
 */
export const paintHouse = (costs: readonly (readonly number[])[]): number => {
	let [red, blue, green] = [0, 0, 0];

	for (const [redCost = 0, blueCost = 0, greenCost = 0] of costs) {
		[red, blue, green] = [
			redCost + Math.min(blue, green),
			blueCost + Math.min(red, green),
			greenCost + Math.min(red, blue),
		];
	}

	return Math.min(red, blue, green);
};
