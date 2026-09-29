const APPLY: Readonly<Record<string, (a: number, b: number) => number>> = {
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
	"*": (a, b) => a * b,
};

/**
 * 241. Different Ways to Add Parentheses
 *
 * Returns the result of every way to fully parenthesise `expression`, which
 * is made of non-negative integers and `+`, `-` and `*`. Results appear once
 * per way of grouping, so equal results can repeat.
 *
 * Each operator can be the last one applied, splitting the expression into
 * a left and a right part whose results combine in every pairing. The
 * results for each part are memoized, since the same part is reached through
 * many splits.
 *
 * @see https://leetcode.com/problems/different-ways-to-add-parentheses/
 * @difficulty Medium
 * @timeComplexity O(C_n * n) where C_n is the nth Catalan number and n the number of operators
 * @spaceComplexity O(C_n * n)
 *
 * @example
 * differentWaysToAddParentheses("2*3-4*5"); // [-34, -14, -10, -10, 10] in some order
 */
export const differentWaysToAddParentheses = (expression: string): number[] => {
	const tokens = expression.match(/\d+|[+\-*]/g) ?? [];
	const numbers = tokens.filter((_, i) => i % 2 === 0).map(Number);
	const operators = tokens.filter((_, i) => i % 2 === 1);
	const memo = new Map<string, number[]>();

	/** Every result for numbers[low..high] and the operators between them. */
	const results = (low: number, high: number): number[] => {
		if (low === high) return [numbers[low] ?? 0];
		const key = `${low},${high}`;
		const cached = memo.get(key);
		if (cached) return cached;

		const values: number[] = [];
		for (let split = low; split < high; split++) {
			const apply = APPLY[operators[split] ?? ""];
			if (!apply) continue;
			for (const left of results(low, split)) {
				for (const right of results(split + 1, high)) {
					values.push(apply(left, right));
				}
			}
		}

		memo.set(key, values);
		return values;
	};

	return results(0, numbers.length - 1);
};
