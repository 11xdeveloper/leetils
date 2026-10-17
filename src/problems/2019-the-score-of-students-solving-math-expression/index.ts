/**
 * 2019. The Score of Students Solving Math Expression
 *
 * `s` is an expression of single digits, `+` and `*`. An answer equal to
 * its value (multiplication first) scores 5; one that some other order of
 * evaluation gives scores 2; anything else 0. Returns the total score.
 *
 * Interval DP over the digits collects every value each span can take.
 * Answers are at most 1000, so larger values collapse into one "too big"
 * marker, which still turns into 0 when multiplied by 0.
 *
 * @see https://leetcode.com/problems/the-score-of-students-solving-math-expression/
 * @difficulty Hard
 * @timeComplexity O(d^3 · V^2) for d digits and V = 1001 values
 * @spaceComplexity O(d^2 · V)
 *
 * @example
 * theScoreOfStudentsSolvingMathExpression("7+3*1*2", [20, 13, 42]); // 7
 */
export const theScoreOfStudentsSolvingMathExpression = (
	s: string,
	answers: readonly number[],
): number => {
	const TOO_BIG = 1001;
	const digits = [...s].filter((_, i) => i % 2 === 0).map(Number);
	const operators = [...s].filter((_, i) => i % 2 === 1);
	const d = digits.length;

	let correct = 0;
	let term = digits[0] ?? 0;
	for (const [i, operator] of operators.entries()) {
		const digit = digits[i + 1] ?? 0;
		if (operator === "*") term *= digit;
		else [correct, term] = [correct + term, digit];
	}
	correct += term;

	const values: Set<number>[][] = Array.from({ length: d }, (_, i) =>
		Array.from({ length: d }, (_, j) =>
			i === j ? new Set([digits[i] ?? 0]) : new Set<number>(),
		),
	);
	for (let length = 2; length <= d; length++) {
		for (let i = 0; i + length <= d; i++) {
			const j = i + length - 1;
			const span = values[i]?.[j] ?? new Set<number>();
			for (let split = i; split < j; split++) {
				const multiply = operators[split] === "*";
				for (const a of values[i]?.[split] ?? []) {
					for (const b of values[split + 1]?.[j] ?? []) {
						span.add(Math.min(multiply ? a * b : a + b, TOO_BIG));
					}
				}
			}
		}
	}

	const possible = values[0]?.[d - 1] ?? new Set<number>();
	let score = 0;
	for (const answer of answers) {
		if (answer === correct) score += 5;
		else if (answer < TOO_BIG && possible.has(answer)) score += 2;
	}
	return score;
};
