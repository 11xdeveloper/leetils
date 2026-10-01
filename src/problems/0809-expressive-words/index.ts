/**
 * 809. Expressive Words
 *
 * A word is stretchy to `s` if `s` can be made from it by extending groups
 * of equal letters, where an extended group must end up at least 3 long.
 * Counts the stretchy `words`.
 *
 * Splits both strings into runs of equal letters. Each pair of runs must
 * share a letter, and `s`'s run must be equal in length, or at least 3 and
 * no shorter than the word's.
 *
 * @see https://leetcode.com/problems/expressive-words/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(n)
 *
 * @example
 * expressiveWords("heeellooo", ["hello", "hi", "helo"]); // 1
 */
export const expressiveWords = (
	s: string,
	words: readonly string[],
): number => {
	const runs = (text: string): string[] => text.match(/(.)\1*/g) ?? [];
	const target = runs(s);
	return words.filter((word) => {
		const parts = runs(word);
		return (
			parts.length === target.length &&
			parts.every((part, i) => {
				const goal = target[i] ?? "";
				return (
					part.charAt(0) === goal.charAt(0) &&
					(goal.length === part.length ||
						(goal.length >= 3 && goal.length > part.length))
				);
			})
		);
	}).length;
};
