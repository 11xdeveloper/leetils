/**
 * 2079. Watering Plants
 *
 * Plants stand at `x = 0..n-1` with the river at `x = -1`. Starting at the
 * river with a full can, water them in order, refilling only when the can
 * can't fully water the next plant. Returns the steps taken.
 *
 * Each plant costs one step forward, plus a round trip of `2i` steps to
 * the river when a refill is needed before plant `i`.
 *
 * @see https://leetcode.com/problems/watering-plants/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * wateringPlants([2, 2, 3, 3], 5); // 14
 */
export const wateringPlants = (
	plants: readonly number[],
	capacity: number,
): number => {
	let [steps, water] = [0, capacity];
	for (const [i, plant] of plants.entries()) {
		if (water < plant) [steps, water] = [steps + 2 * i, capacity];
		steps++;
		water -= plant;
	}
	return steps;
};
