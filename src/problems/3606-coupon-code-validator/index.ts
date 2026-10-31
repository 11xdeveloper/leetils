const LINES = ["electronics", "grocery", "pharmacy", "restaurant"];

/**
 * 3606. Coupon Code Validator
 *
 * A coupon is valid if it's active, its code is non-empty and only
 * letters, digits and underscores, and its business line is electronics,
 * grocery, pharmacy or restaurant. Returns the valid codes, ordered by
 * business line in that order and then by code.
 *
 * @see https://leetcode.com/problems/coupon-code-validator/
 * @difficulty Easy
 * @timeComplexity O(n log n · L)
 * @spaceComplexity O(n)
 *
 * @example
 * couponCodeValidator(["SAVE20", "", "PHARMA5", "SAVE@20"], ["restaurant", "grocery", "pharmacy", "restaurant"], [true, true, true, true]); // ["PHARMA5", "SAVE20"]
 */
export const couponCodeValidator = (
	code: readonly string[],
	businessLine: readonly string[],
	isActive: readonly boolean[],
): string[] =>
	code
		.map((value, i) => [LINES.indexOf(businessLine[i] ?? ""), value] as const)
		.filter(
			([line, value], i) => isActive[i] && line >= 0 && /^\w+$/.test(value),
		)
		.sort((a, b) => a[0] - b[0] || (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0))
		.map(([, value]) => value);
