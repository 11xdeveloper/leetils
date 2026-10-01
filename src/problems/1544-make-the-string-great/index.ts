/**
 * 1544. Make The String Great
 *
 * Repeatedly removes neighbouring pairs that are the same letter in
 * different cases, and returns what's left.
 *
 * A stack: each character cancels the top if they form such a pair, and is
 * pushed otherwise.
 *
 * @see https://leetcode.com/problems/make-the-string-great/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeTheStringGreat("leEeetcode"); // "leetcode"
 */
export const makeTheStringGreat = (s: string): string => {
	const stack: string[] = [];
	for (const char of s) {
		const top = stack.at(-1);
		if (
			top !== undefined &&
			top !== char &&
			top.toLowerCase() === char.toLowerCase()
		)
			stack.pop();
		else stack.push(char);
	}
	return stack.join("");
};
