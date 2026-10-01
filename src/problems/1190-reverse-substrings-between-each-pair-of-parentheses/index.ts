/**
 * 1190. Reverse Substrings Between Each Pair of Parentheses
 *
 * Reverses the text inside each pair of parentheses in `s`, innermost
 * first, and returns the result without the parentheses.
 *
 * Pairs up the parentheses with a stack. Then reads the string once:
 * reaching a parenthesis jumps to its partner and turns round, which reads
 * each bracketed part backwards once for every pair enclosing it.
 *
 * @see https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseSubstringsBetweenEachPairOfParentheses("(ed(et(oc))el)"); // "leetcode"
 */
export const reverseSubstringsBetweenEachPairOfParentheses = (
	s: string,
): string => {
	const partner = new Int32Array(s.length);
	const open: number[] = [];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(") open.push(i);
		else if (s[i] === ")") {
			const j = open.pop() ?? 0;
			partner[i] = j;
			partner[j] = i;
		}
	}
	let result = "";
	for (let i = 0, step = 1; i < s.length; i += step) {
		const char = s[i] ?? "";
		if (char === "(" || char === ")") {
			i = partner[i] ?? i;
			step = -step;
		} else {
			result += char;
		}
	}
	return result;
};
