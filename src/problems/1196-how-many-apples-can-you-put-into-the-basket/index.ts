/**
 * 1196. How Many Apples Can You Put into the Basket
 *
 * Returns the most apples, with weights `weight`, that fit in a basket
 * holding up to 5000 units of weight.
 *
 * Takes the lightest apples first until the next one doesn't fit.
 *
 * @see https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * howManyApplesCanYouPutIntoTheBasket([900, 950, 800, 1000, 700, 800]); // 5
 */
export const howManyApplesCanYouPutIntoTheBasket = (
	weight: readonly number[],
): number => {
	let [total, apples] = [0, 0];
	for (const apple of weight.toSorted((a, b) => a - b)) {
		total += apple;
		if (total > 5000) break;
		apples++;
	}
	return apples;
};
