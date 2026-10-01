/**
 * 648. Replace Words
 *
 * Replaces each word in `sentence` that starts with a root from
 * `dictionary` by the shortest such root.
 *
 * Puts the roots in a set, then checks each word's prefixes from shortest
 * to longest (up to the longest root).
 *
 * @see https://leetcode.com/problems/replace-words/
 * @difficulty Medium
 * @timeComplexity O(total length of the sentence · L) for roots up to length L
 * @spaceComplexity O(total length of the dictionary)
 *
 * @example
 * replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery"); // "the cat was rat by the bat"
 */
export const replaceWords = (
	dictionary: readonly string[],
	sentence: string,
): string => {
	const roots = new Set(dictionary);
	const longest = Math.max(0, ...dictionary.map((root) => root.length));

	return sentence
		.split(" ")
		.map((word) => {
			for (let length = 1; length <= Math.min(longest, word.length); length++) {
				if (roots.has(word.slice(0, length))) return word.slice(0, length);
			}
			return word;
		})
		.join(" ");
};
