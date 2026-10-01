/**
 * 758. Bold Words in String
 *
 * Wraps every occurrence in `s` of any of `words` in `<b>` and `</b>`,
 * using as few tags as possible: overlapping or touching bold stretches are
 * merged.
 *
 * Marks each character covered by some occurrence, then writes the string
 * with a tag at the start and end of every run of marked characters.
 *
 * @see https://leetcode.com/problems/bold-words-in-string/
 * @difficulty Medium
 * @timeComplexity O(n · total length of the words)
 * @spaceComplexity O(n)
 *
 * @example
 * boldWordsInString(["ab", "bc"], "aabcd"); // "a<b>abc</b>d"
 */
export const boldWordsInString = (
	words: readonly string[],
	s: string,
): string => {
	const bold = new Uint8Array(s.length);
	for (const word of words) {
		for (
			let start = s.indexOf(word);
			start !== -1;
			start = s.indexOf(word, start + 1)
		)
			bold.fill(1, start, start + word.length);
	}

	let result = "";
	for (let i = 0; i < s.length; i++) {
		if (bold[i] && !bold[i - 1]) result += "<b>";
		result += s.charAt(i);
		if (bold[i] && !bold[i + 1]) result += "</b>";
	}
	return result;
};
