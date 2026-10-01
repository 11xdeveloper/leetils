/**
 * 537. Complex Number Multiplication
 *
 * Multiplies two complex numbers written as `"a+bi"` (where `a` and `b` may
 * be negative, as in `"1+-1i"`) and returns the product in the same format.
 *
 * `(a + bi)(c + di) = (ac - bd) + (ad + bc)i`.
 *
 * @see https://leetcode.com/problems/complex-number-multiplication/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * complexNumberMultiplication("1+-1i", "1+-1i"); // "0+-2i"
 */
export const complexNumberMultiplication = (
	num1: string,
	num2: string,
): string => {
	const parse = (num: string): [number, number] => {
		const [real = "0", imaginary = "0i"] = num.split("+");
		return [Number(real), Number(imaginary.slice(0, -1))];
	};
	const [a, b] = parse(num1);
	const [c, d] = parse(num2);
	return `${a * c - b * d}+${a * d + b * c}i`;
};
