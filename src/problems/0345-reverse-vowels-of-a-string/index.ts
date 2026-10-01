const VOWELS = new Set("aeiouAEIOU");

/**
 * 345. Reverse Vowels of a String
 *
 * Reverses the order of the vowels (a, e, i, o, u, in either case) in `s`,
 * leaving every other character where it is.
 *
 * Two pointers move in from both ends, each stopping at a vowel, and swap
 * them.
 *
 * @see https://leetcode.com/problems/reverse-vowels-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reverseVowelsOfAString("IceCreAm"); // "AceCreIm"
 */
export const reverseVowelsOfAString = (s: string): string => {
	const chars = [...s];

	for (let i = 0, j = chars.length - 1; i < j; ) {
		if (!VOWELS.has(chars[i] ?? "")) i++;
		else if (!VOWELS.has(chars[j] ?? "")) j--;
		else {
			[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
			i++;
			j--;
		}
	}

	return chars.join("");
};
