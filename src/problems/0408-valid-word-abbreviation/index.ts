/**
 * 408. Valid Word Abbreviation
 *
 * Returns whether `abbr` abbreviates `word`: letters must match, and each
 * number (without leading zeros) skips that many letters.
 *
 * Walks both strings together, reading each number in `abbr` in full and
 * jumping ahead that many letters in `word`.
 *
 * @see https://leetcode.com/problems/valid-word-abbreviation/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * validWordAbbreviation("internationalization", "i12iz4n"); // true
 * validWordAbbreviation("apple", "a2e"); // false
 */
export const validWordAbbreviation = (word: string, abbr: string): boolean => {
	let i = 0;
	let j = 0;

	while (j < abbr.length) {
		const char = abbr.charAt(j);
		if (char >= "0" && char <= "9") {
			if (char === "0") return false;
			let skip = 0;
			while (
				j < abbr.length &&
				abbr.charAt(j) >= "0" &&
				abbr.charAt(j) <= "9"
			) {
				skip = skip * 10 + Number(abbr.charAt(j));
				j++;
			}
			i += skip;
		} else {
			if (word[i] !== char) return false;
			i++;
			j++;
		}
		if (i > word.length) return false;
	}

	return i === word.length;
};
