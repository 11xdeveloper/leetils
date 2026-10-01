/**
 * 616. Add Bold Tag in String
 *
 * Wraps every substring of `s` that is one of `words` in `<b>` and `</b>`,
 * merging overlapping or touching bold stretches into one.
 *
 * Marks each character covered by some word's occurrence, then writes the
 * string with a tag at the start and end of every run of marked
 * characters.
 *
 * @see https://leetcode.com/problems/add-bold-tag-in-string/
 * @difficulty Medium
 * @timeComplexity O(n · total length of the words)
 * @spaceComplexity O(n)
 *
 * @example
 * addBoldTagInString("aaabbb", ["aa", "b"]); // "<b>aaabbb</b>"
 */
export const addBoldTagInString = (
	s: string,
	words: readonly string[],
): string => {
	const bold = new Uint8Array(s.length);
	for (const word of words) {
		for (
			let start = s.indexOf(word);
			start !== -1;
			start = s.indexOf(word, start + 1)
		) {
			bold.fill(1, start, start + word.length);
		}
	}

	let result = "";
	for (let i = 0; i < s.length; i++) {
		if (bold[i] && !bold[i - 1]) result += "<b>";
		result += s.charAt(i);
		if (bold[i] && !bold[i + 1]) result += "</b>";
	}
	return result;
};
