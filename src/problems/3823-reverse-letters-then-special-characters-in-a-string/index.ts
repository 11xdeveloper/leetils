/**
 * 3823. Reverse Letters Then Special Characters in a String
 *
 * Reverses the letters of `s` among the letters' positions, then the
 * special characters among theirs.
 *
 * @see https://leetcode.com/problems/reverse-letters-then-special-characters-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseLettersThenSpecialCharactersInAString(")ebc#da@f("); // "(fad@cb#e)"
 */
export const reverseLettersThenSpecialCharactersInAString = (
	s: string,
): string => {
	const isLetter = (c: string) => c >= "a" && c <= "z";
	const letters = [...s].filter(isLetter);
	const specials = [...s].filter((c) => !isLetter(c));
	return [...s]
		.map((c) => (isLetter(c) ? letters.pop() : specials.pop()) ?? "")
		.join("");
};
