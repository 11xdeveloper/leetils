/**
 * 1599. Maximum Profit of Operating a Centennial Wheel
 *
 * Before rotation `i`, `customers[i]` people arrive; up to four board each
 * rotation, paying `boardingCost`, and each rotation costs `runningCost`.
 * Returns the fewest rotations giving the highest profit, or -1 if the
 * profit is never positive.
 *
 * Simulates rotations until nobody is left, tracking the best profit and
 * when it was first reached.
 *
 * @see https://leetcode.com/problems/maximum-profit-of-operating-a-centennial-wheel/
 * @difficulty Medium
 * @timeComplexity O(n + total customers)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProfitOfOperatingACentennialWheel([8, 3], 5, 6); // 3
 */
export const maximumProfitOfOperatingACentennialWheel = (
	customers: readonly number[],
	boardingCost: number,
	runningCost: number,
): number => {
	let [waiting, profit, best, bestRotations] = [0, 0, 0, -1];
	for (
		let rotation = 0;
		rotation < customers.length || waiting > 0;
		rotation++
	) {
		waiting += customers[rotation] ?? 0;
		const boarding = Math.min(4, waiting);
		waiting -= boarding;
		profit += boarding * boardingCost - runningCost;
		if (profit > best) [best, bestRotations] = [profit, rotation + 1];
	}
	return bestRotations;
};
