/**
 * 2262. Total Appeal of a String
 *
 * A string's appeal is its number of distinct characters. Returns the
 * total appeal of all substrings of `s`.
 *
 * Credit each distinct character to its first occurrence in a substring:
 * the character at `i` is first in substrings starting after its previous
 * occurrence and ending at or after `i`.
 *
 * @see https://leetcode.com/problems/total-appeal-of-a-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * totalAppealOfAString("abbca"); // 28
 */
export const totalAppealOfAString = (s: string): number => {
	const last = new Map<string, number>();
	let total = 0;
	for (const [i, char] of [...s].entries()) {
		total += (i - (last.get(char) ?? -1)) * (s.length - i);
		last.set(char, i);
	}
	return total;
};
