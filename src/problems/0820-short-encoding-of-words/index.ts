/**
 * 820. Short Encoding of Words
 *
 * Returns the length of the shortest reference string `s` (words each
 * followed by `#`) in which every word of `words` appears as a substring
 * ending just before a `#`.
 *
 * A word that's a suffix of another word can share its encoding, so only
 * words that aren't a suffix of any other need writing, each with a `#`.
 *
 * @see https://leetcode.com/problems/short-encoding-of-words/
 * @difficulty Medium
 * @timeComplexity O(n · L^2) for words of length up to L
 * @spaceComplexity O(n · L)
 *
 * @example
 * shortEncodingOfWords(["time", "me", "bell"]); // 10: "time#bell#"
 */
export const shortEncodingOfWords = (words: readonly string[]): number => {
	const needed = new Set(words);
	for (const word of words)
		for (let i = 1; i < word.length; i++) needed.delete(word.slice(i));
	let length = 0;
	for (const word of needed) length += word.length + 1;
	return length;
};
