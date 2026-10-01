/**
 * 990. Satisfiability of Equality Equations
 *
 * Each equation is `"a==b"` or `"a!=b"` over single-letter variables.
 * Returns whether integers can be assigned to satisfy them all.
 *
 * Union–find merges variables that must be equal; then every inequality
 * must be between different groups.
 *
 * @see https://leetcode.com/problems/satisfiability-of-equality-equations/
 * @difficulty Medium
 * @timeComplexity O(n · α(26))
 * @spaceComplexity O(1), 26 variables
 *
 * @example
 * satisfiabilityOfEqualityEquations(["a==b", "b!=a"]); // false
 */
export const satisfiabilityOfEqualityEquations = (
	equations: readonly string[],
): boolean => {
	const parent = Array.from({ length: 26 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) x = parent[x] ?? x;
		return x;
	};
	const variable = (equation: string, at: number) =>
		equation.charCodeAt(at) - 97;
	for (const equation of equations)
		if (equation.charAt(1) === "=")
			parent[find(variable(equation, 0))] = find(variable(equation, 3));
	return equations.every(
		(equation) =>
			equation.charAt(1) === "=" ||
			find(variable(equation, 0)) !== find(variable(equation, 3)),
	);
};
