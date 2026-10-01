/**
 * 736. Parse Lisp Expression
 *
 * Evaluates a Lisp-like expression of integers, variables, `(add a b)`,
 * `(mult a b)` and `(let v1 e1 v2 e2 … expr)`, where `let` assigns
 * variables in order in a new innermost scope and returns `expr`'s value.
 * A variable takes its value from the innermost scope defining it.
 *
 * Splits the expression into tokens and evaluates recursively, keeping a
 * stack of scopes that each `let` pushes and pops.
 *
 * @see https://leetcode.com/problems/parse-lisp-expression/
 * @difficulty Hard
 * @timeComplexity O(n · d) for nesting depth d, for variable lookups
 * @spaceComplexity O(n)
 *
 * @example
 * parseLispExpression("(let x 2 (mult x (let x 3 y 4 (add x y))))"); // 14
 */
export const parseLispExpression = (expression: string): number => {
	const tokens = expression.match(/\(|\)|[^\s()]+/g) ?? [];
	const scopes: Map<string, number>[] = [];
	let position = 0;

	const lookup = (token: string): number => {
		if (/^-?\d+$/.test(token)) return Number(token);
		for (let i = scopes.length - 1; i >= 0; i--) {
			const value = scopes[i]?.get(token);
			if (value !== undefined) return value;
		}
		return 0;
	};

	const evaluate = (): number => {
		const token = tokens[position++] ?? "";
		if (token !== "(") return lookup(token);

		const operator = tokens[position++];
		let value: number;
		if (operator === "let") {
			const scope = new Map<string, number>();
			scopes.push(scope);
			for (;;) {
				const next = tokens[position] ?? "";
				if (next === "(" || tokens[position + 1] === ")") {
					value = evaluate();
					break;
				}
				position++;
				scope.set(next, evaluate());
			}
			scopes.pop();
		} else {
			const a = evaluate();
			const b = evaluate();
			value = operator === "add" ? a + b : a * b;
		}
		position++; // The closing ")".
		return value;
	};

	return evaluate();
};
