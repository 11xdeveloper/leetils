/**
 * 1402. Reducing Dishes
 *
 * Cooking a dish at time `t` (1, 2, …) earns `t` times its satisfaction.
 * Returns the most that can be earned by cooking some of the dishes in the
 * best order.
 *
 * Chosen dishes go in increasing order of satisfaction. Adding dishes from
 * the most satisfying down, each new dish shifts all the chosen ones one
 * step later, adding their total again; keep going while that total stays
 * positive.
 *
 * @see https://leetcode.com/problems/reducing-dishes/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * reducingDishes([-1, -8, 0, 5, -9]); // 14
 */
export const reducingDishes = (satisfaction: readonly number[]): number => {
	let [chosen, total] = [0, 0];
	for (const dish of satisfaction.toSorted((a, b) => b - a)) {
		if (chosen + dish <= 0) break;
		chosen += dish;
		total += chosen;
	}
	return total;
};
