/**
 * 686. Repeated String Match
 *
 * Returns the fewest copies of `a` that, joined together, contain `b` as a
 * substring, or -1 if no number of copies does.
 *
 * Enough copies to be at least as long as `b` is the minimum; one more
 * copy covers every possible starting offset within `a`. If neither
 * contains `b`, more copies won't help.
 *
 * @see https://leetcode.com/problems/repeated-string-match/
 * @difficulty Medium
 * @timeComplexity O(n + m) on average for the substring search
 * @spaceComplexity O(n + m)
 *
 * @example
 * repeatedStringMatch("abcd", "cdabcdab"); // 3
 */
export const repeatedStringMatch = (a: string, b: string): number => {
	const copies = Math.ceil(b.length / a.length);
	const repeated = a.repeat(copies);
	if (repeated.includes(b)) return copies;
	if ((repeated + a).includes(b)) return copies + 1;
	return -1;
};
