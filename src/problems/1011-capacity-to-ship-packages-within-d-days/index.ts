/**
 * 1011. Capacity To Ship Packages Within D Days
 *
 * Packages must ship in order, some each day, with the day's total weight
 * at most the ship's capacity. Returns the smallest capacity that ships
 * everything within `days` days.
 *
 * Binary search on the capacity, between the heaviest package and the total.
 * For a capacity, loading greedily day by day gives the fewest days needed.
 *
 * @see https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
 * @difficulty Medium
 * @timeComplexity O(n log total)
 * @spaceComplexity O(1)
 *
 * @example
 * capacityToShipPackagesWithinDDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5); // 15
 */
export const capacityToShipPackagesWithinDDays = (
	weights: readonly number[],
	days: number,
): number => {
	let low = Math.max(...weights);
	let high = weights.reduce((a, b) => a + b, 0);
	while (low < high) {
		const capacity = Math.floor((low + high) / 2);
		let needed = 1;
		let load = 0;
		for (const weight of weights) {
			if (load + weight > capacity) {
				needed++;
				load = 0;
			}
			load += weight;
		}
		if (needed <= days) high = capacity;
		else low = capacity + 1;
	}
	return low;
};
