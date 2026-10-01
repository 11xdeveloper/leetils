/**
 * 1957. Delete Characters to Make Fancy String
 *
 * Deletes the fewest characters from `s` so no three consecutive
 * characters are equal.
 *
 * Keep a character unless it would be the third in a row.
 *
 * @see https://leetcode.com/problems/delete-characters-to-make-fancy-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * deleteCharactersToMakeFancyString("aaabaaaa"); // "aabaa"
 */
export const deleteCharactersToMakeFancyString = (s: string): string => {
	const kept: string[] = [];
	for (const char of s)
		if (!(kept.at(-1) === char && kept.at(-2) === char)) kept.push(char);
	return kept.join("");
};
