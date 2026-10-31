/**
 * 3163. String Compression III
 *
 * Compress `word` by repeatedly taking its longest prefix of one repeated
 * letter, up to 9 long, and writing its length followed by the letter.
 *
 * Walk the runs, splitting any longer than 9.
 *
 * @see https://leetcode.com/problems/string-compression-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stringCompressionIII("aaaaaaaaaaaaaabb"); // "9a5a2b"
 */
export const stringCompressionIII = (word: string): string => {
	const parts: string[] = [];
	for (let i = 0; i < word.length; ) {
		let j = i;
		while (j < word.length && j - i < 9 && word[j] === word[i]) j++;
		parts.push(`${j - i}${word[i]}`);
		i = j;
	}
	return parts.join("");
};
