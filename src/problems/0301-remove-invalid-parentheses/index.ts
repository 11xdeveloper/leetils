/**
 * 301. Remove Invalid Parentheses
 *
 * Returns every distinct string made by removing the fewest parentheses from
 * `s` so that its parentheses are balanced. Letters are kept.
 *
 * Counts how many unmatched `(` and `)` there are, which is exactly how many
 * of each must go. Backtracking then removes that many of each, skipping a
 * parenthesis that repeats the one before it, since removing either gives
 * the same string. Every string that uses up the removals and is balanced
 * is an answer.
 *
 * @see https://leetcode.com/problems/remove-invalid-parentheses/
 * @difficulty Hard
 * @timeComplexity O(n * 2^n)
 * @spaceComplexity O(n) excluding the returned strings
 *
 * @example
 * removeInvalidParentheses("()())()"); // ["(())()", "()()()"]
 */
export const removeInvalidParentheses = (s: string): string[] => {
	let extraOpen = 0;
	let extraClose = 0;
	for (const char of s) {
		if (char === "(") extraOpen++;
		else if (char === ")") {
			if (extraOpen > 0) extraOpen--;
			else extraClose++;
		}
	}

	const isBalanced = (text: string): boolean => {
		let depth = 0;
		for (const char of text) {
			if (char === "(") depth++;
			else if (char === ")" && --depth < 0) return false;
		}
		return depth === 0;
	};

	const results = new Set<string>();
	const remove = (
		text: string,
		start: number,
		open: number,
		close: number,
	): void => {
		if (open === 0 && close === 0) {
			if (isBalanced(text)) results.add(text);
			return;
		}
		for (let i = start; i < text.length; i++) {
			const char = text[i];
			if (i > start && char === text[i - 1]) continue;
			const rest = text.slice(0, i) + text.slice(i + 1);
			if (char === "(" && open > 0) remove(rest, i, open - 1, close);
			if (char === ")" && close > 0) remove(rest, i, open, close - 1);
		}
	};

	remove(s, 0, extraOpen, extraClose);
	return [...results];
};
