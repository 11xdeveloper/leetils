/**
 * 224. Basic Calculator
 *
 * Evaluates a valid expression of non-negative integers, `+`, `-`,
 * parentheses and spaces, without `eval`. `-` can also negate, as in `"-1"`
 * or `"-(2 + 3)"`.
 *
 * Keeps a running total and the sign of the next number. An opening
 * parenthesis saves the total and sign on a stack and starts a fresh total;
 * the closing one applies the saved sign to the inner total and adds it to
 * the saved total.
 *
 * @see https://leetcode.com/problems/basic-calculator/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * basicCalculator("(1+(4+5+2)-3)+(6+8)"); // 23
 */
export const basicCalculator = (s: string): number => {
	const stack: [total: number, sign: number][] = [];
	let total = 0;
	let sign = 1;

	for (let i = 0; i < s.length; i++) {
		const char = s.charAt(i);
		if (char >= "0" && char <= "9") {
			let number = 0;
			while (i < s.length && s.charAt(i) >= "0" && s.charAt(i) <= "9") {
				number = number * 10 + (s.charCodeAt(i) - 48);
				i++;
			}
			i--;
			total += sign * number;
		} else if (char === "+") {
			sign = 1;
		} else if (char === "-") {
			sign = -1;
		} else if (char === "(") {
			stack.push([total, sign]);
			total = 0;
			sign = 1;
		} else if (char === ")") {
			const [outerTotal, outerSign] = stack.pop() ?? [0, 1];
			total = outerTotal + outerSign * total;
		}
	}

	// `|| 0` turns a -0 total into 0.
	return total || 0;
};
