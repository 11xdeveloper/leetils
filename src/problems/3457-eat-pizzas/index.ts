/**
 * 3457. Eat Pizzas!
 *
 * Eat four pizzas a day until they're gone. On odd days you gain the
 * heaviest pizza's weight, on even days the second heaviest's. Returns the
 * most weight you can gain.
 *
 * On odd days, the gain is simply the heaviest left, so give odd days the
 * heaviest pizzas outright. Each even day then needs its gain paired with
 * one heavier pizza, so take every other one of the next heaviest.
 *
 * @see https://leetcode.com/problems/eat-pizzas/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * eatPizzas([1, 2, 3, 4, 5, 6, 7, 8]); // 14
 */
export const eatPizzas = (pizzas: readonly number[]): number => {
	const sorted = pizzas.toSorted((a, b) => b - a);
	const days = sorted.length / 4;
	const odd = Math.ceil(days / 2);
	let total = 0;
	for (let i = 0; i < odd; i++) total += sorted[i] ?? 0;
	for (let i = 0; i < days - odd; i++) total += sorted[odd + 2 * i + 1] ?? 0;
	return total;
};
