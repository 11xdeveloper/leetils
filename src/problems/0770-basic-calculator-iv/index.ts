/**
 * 770. Basic Calculator IV
 *
 * Simplifies an expression of variables, non-negative integers, `+`, `-`,
 * `*` and parentheses (tokens separated by spaces), after substituting the
 * values in `evalvars`/`evalints`. Returns the polynomial's terms: highest
 * degree first, ties in lexicographic order of their variables, each as
 * `"coefficient*var*var"` (or just the coefficient for the constant), with
 * zero terms left out.
 *
 * Recursive descent over the tokens, building polynomials as maps from a
 * term's sorted variables (joined by `*`, `""` for the constant) to its
 * coefficient. Products multiply every pair of terms.
 *
 * @see https://leetcode.com/problems/basic-calculator-iv/
 * @difficulty Hard
 * @timeComplexity O(2^n) terms in the worst case, far fewer in practice
 * @spaceComplexity O(number of terms)
 *
 * @example
 * basicCalculatorIV("(e + 8) * (e - 8)", [], []); // ["1*e*e", "-64"]
 */
export const basicCalculatorIV = (
	expression: string,
	evalvars: readonly string[],
	evalints: readonly number[],
): string[] => {
	type Polynomial = Map<string, number>;
	const values = new Map(evalvars.map((name, i) => [name, evalints[i] ?? 0]));
	const tokens = expression.match(/\(|\)|[a-z]+|\d+|[+\-*]/g) ?? [];
	let position = 0;

	const combine = (a: Polynomial, b: Polynomial, sign: number): Polynomial => {
		const result = new Map(a);
		for (const [key, coefficient] of b)
			result.set(key, (result.get(key) ?? 0) + sign * coefficient);
		return result;
	};
	const multiply = (a: Polynomial, b: Polynomial): Polynomial => {
		const result: Polynomial = new Map();
		for (const [keyA, coefficientA] of a) {
			for (const [keyB, coefficientB] of b) {
				const key = [...keyA.split("*"), ...keyB.split("*")]
					.filter((name) => name !== "")
					.sort()
					.join("*");
				result.set(key, (result.get(key) ?? 0) + coefficientA * coefficientB);
			}
		}
		return result;
	};

	const factor = (): Polynomial => {
		const token = tokens[position++] ?? "0";
		if (token === "(") {
			const inner = sum();
			position++; // The closing ")".
			return inner;
		}
		if (/^\d+$/.test(token)) return new Map([["", Number(token)]]);
		const value = values.get(token);
		return value === undefined ? new Map([[token, 1]]) : new Map([["", value]]);
	};
	const product = (): Polynomial => {
		let result = factor();
		while (tokens[position] === "*") {
			position++;
			result = multiply(result, factor());
		}
		return result;
	};
	const sum = (): Polynomial => {
		let result = product();
		while (tokens[position] === "+" || tokens[position] === "-") {
			const sign = tokens[position++] === "+" ? 1 : -1;
			result = combine(result, product(), sign);
		}
		return result;
	};

	const degree = (key: string): number =>
		key === "" ? 0 : key.split("*").length;
	return [...sum()]
		.filter(([, coefficient]) => coefficient !== 0)
		.sort(([a], [b]) => degree(b) - degree(a) || (a < b ? -1 : a > b ? 1 : 0))
		.map(([key, coefficient]) =>
			key === "" ? String(coefficient) : `${coefficient}*${key}`,
		);
};
