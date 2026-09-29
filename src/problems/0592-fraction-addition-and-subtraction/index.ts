/**
 * 592. Fraction Addition and Subtraction
 *
 * Evaluates an expression of fractions added and subtracted, like
 * `"-1/2+1/2+1/3"`, and returns the result as an irreducible fraction
 * `"numerator/denominator"` (an integer is written over 1, as in `"2/1"`).
 *
 * Reads each signed fraction with a regular expression and adds it to a
 * running total over a common denominator, reducing by the greatest common
 * divisor as it goes so the numbers stay small.
 *
 * @see https://leetcode.com/problems/fraction-addition-and-subtraction/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * fractionAdditionAndSubtraction("-1/2+1/2+1/3"); // "1/3"
 */
export const fractionAdditionAndSubtraction = (expression: string): string => {
	const gcd = (a: number, b: number): number => {
		for (a = Math.abs(a), b = Math.abs(b); b !== 0; ) [a, b] = [b, a % b];
		return a;
	};

	let numerator = 0;
	let denominator = 1;
	for (const [, top = "0", bottom = "1"] of expression.matchAll(
		/([+-]?\d+)\/(\d+)/g,
	)) {
		numerator = numerator * Number(bottom) + Number(top) * denominator;
		denominator *= Number(bottom);
		const divisor = gcd(numerator, denominator);
		numerator /= divisor;
		denominator /= divisor;
	}

	return `${numerator}/${denominator}`;
};
