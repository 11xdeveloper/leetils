/**
 * 1006. Clumsy Factorial
 *
 * The clumsy factorial of `n` uses the operators `*`, `/`, `+`, `-` in
 * rotation between `n, n - 1, …, 1`, with the usual precedence and
 * division rounding down: `clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1`.
 *
 * Evaluates with a stack of terms: `*` and `/` fold into the last term,
 * `+` pushes the next number and `-` pushes its negation. The answer is
 * the sum.
 *
 * @see https://leetcode.com/problems/clumsy-factorial/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * clumsyFactorial(10); // 12
 */
export const clumsyFactorial = (n: number): number => {
	const terms = [n];
	for (let x = n - 1, op = 0; x >= 1; x--, op = (op + 1) % 4) {
		const last = terms.length - 1;
		if (op === 0) terms[last] = (terms[last] ?? 0) * x;
		else if (op === 1) terms[last] = Math.trunc((terms[last] ?? 0) / x);
		else if (op === 2) terms.push(x);
		else terms.push(-x);
	}
	return terms.reduce((a, b) => a + b, 0);
};
