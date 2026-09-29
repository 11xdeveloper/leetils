/**
 * 227. Basic Calculator II
 *
 * Evaluates a valid expression of non-negative integers, `+`, `-`, `*`, `/`
 * and spaces, without `eval`. Division truncates towards zero, and `*` and
 * `/` bind tighter than `+` and `-`.
 *
 * Adds up terms as it goes. `*` and `/` only ever change the term being
 * built, so it keeps the current term separate from the total and folds it
 * in when a `+` or `-` starts the next one. No stack is needed.
 *
 * @see https://leetcode.com/problems/basic-calculator-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * basicCalculatorII(" 3+5 / 2 "); // 5
 */
export const basicCalculatorII = (s: string): number => {
	let total = 0;
	let term = 0;
	let number = 0;
	let operator = "+";

	for (let i = 0; i <= s.length; i++) {
		const char = s.charAt(i);
		if (char >= "0" && char <= "9") {
			number = number * 10 + (s.charCodeAt(i) - 48);
			continue;
		}
		if (char === " ") continue;

		// An operator, or the end of the string: apply the previous operator.
		if (operator === "+" || operator === "-") {
			total += term;
			term = operator === "+" ? number : -number;
		} else if (operator === "*") {
			term *= number;
		} else {
			term = Math.trunc(term / number);
		}
		operator = char;
		number = 0;
	}

	// `|| 0` turns a -0 result into 0.
	return total + term || 0;
};
