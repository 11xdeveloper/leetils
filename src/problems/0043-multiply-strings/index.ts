/**
 * 43. Multiply Strings
 *
 * Multiplies two non-negative integers given as strings and returns the
 * product as a string, without converting the inputs to numbers.
 *
 * Long multiplication: the digits at positions `i` and `j` (from the left)
 * contribute to positions `i + j` and `i + j + 1` of the product. Each
 * product is added to the lower position, carrying into the higher one.
 *
 * @see https://leetcode.com/problems/multiply-strings/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * multiplyStrings("123", "456"); // "56088"
 */
export const multiplyStrings = (num1: string, num2: string): string => {
	if (num1 === "0" || num2 === "0") return "0";

	const product = new Array<number>(num1.length + num2.length).fill(0);

	for (let i = num1.length - 1; i >= 0; i--) {
		for (let j = num2.length - 1; j >= 0; j--) {
			const sum = Number(num1[i]) * Number(num2[j]) + (product[i + j + 1] ?? 0);
			product[i + j + 1] = sum % 10;
			product[i + j] = (product[i + j] ?? 0) + Math.floor(sum / 10);
		}
	}

	// Only the highest position can be 0, since both inputs are non-zero.
	return (product[0] === 0 ? product.slice(1) : product).join("");
};
