/**
 * 2117. Abbreviating the Product of a Range
 *
 * Abbreviates the product of the integers from `left` to `right`: trailing
 * zeros become `eC`, and a remainder longer than 10 digits keeps only its
 * first and last 5, as in `"12345...89632e3"`.
 *
 * Multiply exactly with BigInt; the product of up to 10^4 numbers has
 * tens of thousands of digits, which BigInt handles quickly.
 *
 * @see https://leetcode.com/problems/abbreviating-the-product-of-a-range/
 * @difficulty Hard
 * @timeComplexity O(n · D) for D digits in the product
 * @spaceComplexity O(D)
 *
 * @example
 * abbreviatingTheProductOfARange(1, 4); // "24e0"
 */
export const abbreviatingTheProductOfARange = (
	left: number,
	right: number,
): string => {
	let product = 1n;
	for (let i = left; i <= right; i++) product *= BigInt(i);
	const digits = product.toString();
	const significant = digits.replace(/0+$/, "");
	const zeros = digits.length - significant.length;
	const shown =
		significant.length > 10
			? `${significant.slice(0, 5)}...${significant.slice(-5)}`
			: significant;
	return `${shown}e${zeros}`;
};
