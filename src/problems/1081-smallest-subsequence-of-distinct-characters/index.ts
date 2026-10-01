/**
 * 1081. Smallest Subsequence of Distinct Characters
 *
 * Returns the lexicographically smallest subsequence of `s` containing each
 * of its distinct letters exactly once.
 *
 * A stack builds the answer: a new letter pops larger letters off the top
 * while they occur again later, then goes on the stack unless it's already
 * there.
 *
 * @see https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * smallestSubsequenceOfDistinctCharacters("cbacdcbc"); // "acdb"
 */
export const smallestSubsequenceOfDistinctCharacters = (s: string): string => {
	const last = new Map([...s].map((char, i) => [char, i]));
	const stack: string[] = [];
	const inStack = new Set<string>();
	for (const [i, char] of [...s].entries()) {
		if (inStack.has(char)) continue;
		while (
			stack.length > 0 &&
			(stack.at(-1) ?? "") > char &&
			(last.get(stack.at(-1) ?? "") ?? -1) > i
		)
			inStack.delete(stack.pop() ?? "");
		stack.push(char);
		inStack.add(char);
	}
	return stack.join("");
};
