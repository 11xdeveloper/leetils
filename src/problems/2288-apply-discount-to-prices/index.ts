/**
 * 2288. Apply Discount to Prices
 *
 * A price is a word of `$` followed by digits only. Applies a `discount`
 * percent to every price in the sentence, showing two decimal places.
 *
 * Work in whole cents so the result is exact.
 *
 * @see https://leetcode.com/problems/apply-discount-to-prices/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyDiscountToPrices("there are $1 $2 and 5$ candies in the shop", 50); // "there are $0.50 $1.00 and 5$ candies in the shop"
 */
export const applyDiscountToPrices = (
	sentence: string,
	discount: number,
): string =>
	sentence
		.split(" ")
		.map((word) => {
			if (!/^\$\d+$/.test(word)) return word;
			const cents = Number(word.slice(1)) * (100 - discount);
			return `$${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
		})
		.join(" ");
