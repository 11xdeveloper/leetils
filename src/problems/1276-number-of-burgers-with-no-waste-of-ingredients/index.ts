/**
 * 1276. Number of Burgers with No Waste of Ingredients
 *
 * A jumbo burger takes 4 tomato slices and 1 cheese slice, a small one 2
 * and 1. Returns `[jumbo, small]` using up every slice exactly, or `[]`.
 *
 * Solving `4j + 2s = tomatoSlices` and `j + s = cheeseSlices` gives
 * `j = tomatoSlices / 2 − cheeseSlices`, which must be a whole number with
 * both counts non-negative.
 *
 * @see https://leetcode.com/problems/number-of-burgers-with-no-waste-of-ingredients/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfBurgersWithNoWasteOfIngredients(16, 7); // [1, 6]
 */
export const numberOfBurgersWithNoWasteOfIngredients = (
	tomatoSlices: number,
	cheeseSlices: number,
): number[] => {
	if (tomatoSlices % 2 !== 0) return [];
	const jumbo = tomatoSlices / 2 - cheeseSlices;
	const small = cheeseSlices - jumbo;
	return jumbo >= 0 && small >= 0 ? [jumbo, small] : [];
};
