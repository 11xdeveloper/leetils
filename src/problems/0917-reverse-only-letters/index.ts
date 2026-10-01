/**
 * 917. Reverse Only Letters
 *
 * Reverses the English letters of `s`, leaving every other character where
 * it is.
 *
 * Two pointers from the ends swap letters, skipping everything else.
 *
 * @see https://leetcode.com/problems/reverse-only-letters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseOnlyLetters("a-bC-dEf-ghIj"); // "j-Ih-gfE-dCba"
 */
export const reverseOnlyLetters = (s: string): string => {
	const chars = [...s];
	const isLetter = (char: string | undefined) => /^[a-zA-Z]$/.test(char ?? "");
	for (let i = 0, j = chars.length - 1; i < j; ) {
		if (!isLetter(chars[i])) i++;
		else if (!isLetter(chars[j])) j--;
		else {
			[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
			i++;
			j--;
		}
	}
	return chars.join("");
};
