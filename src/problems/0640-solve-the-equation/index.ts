/**
 * 640. Solve the Equation
 *
 * Solves a linear equation in `x` with only `+`, `-`, integers and `x`
 * terms, like `"x+5-3+x=6+x-2"`. Returns `"x=#value"`, `"No solution"` or
 * `"Infinite solutions"`. A unique solution is guaranteed to be an integer.
 *
 * Reads each side's terms with a regular expression, collecting the
 * coefficient of `x` and the constant, then moves everything to one side:
 * `a · x = b`.
 *
 * @see https://leetcode.com/problems/solve-the-equation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * solveTheEquation("x+5-3+x=6+x-2"); // "x=2"
 */
export const solveTheEquation = (equation: string): string => {
	const parse = (side: string): [coefficient: number, constant: number] => {
		let coefficient = 0;
		let constant = 0;
		for (const [term] of side.matchAll(/[+-]?\d*x|[+-]?\d+/g)) {
			if (term.endsWith("x")) {
				const factor = term.slice(0, -1);
				coefficient +=
					factor === "" || factor === "+"
						? 1
						: factor === "-"
							? -1
							: Number(factor);
			} else {
				constant += Number(term);
			}
		}
		return [coefficient, constant];
	};

	const [left = "", right = ""] = equation.split("=");
	const [leftX, leftConstant] = parse(left);
	const [rightX, rightConstant] = parse(right);
	const a = leftX - rightX;
	const b = rightConstant - leftConstant;

	if (a === 0) return b === 0 ? "Infinite solutions" : "No solution";
	return `x=${b / a}`;
};
