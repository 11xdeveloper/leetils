/**
 * 1002. Find Common Characters
 *
 * Returns every character that appears in all of `words`, repeated as many
 * times as it appears in every word, in alphabetical order here (any order
 * is accepted).
 *
 * Keeps the minimum count of each letter across the words.
 *
 * @see https://leetcode.com/problems/find-common-characters/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(1), 26 counts, excluding the returned array
 *
 * @example
 * findCommonCharacters(["bella", "label", "roller"]); // ["e", "l", "l"]
 */
export const findCommonCharacters = (words: readonly string[]): string[] => {
	let common = new Array<number>(26).fill(Number.POSITIVE_INFINITY);
	for (const word of words) {
		const counts = new Array<number>(26).fill(0);
		for (let i = 0; i < word.length; i++)
			counts[word.charCodeAt(i) - 97] =
				(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
		common = common.map((count, letter) =>
			Math.min(count, counts[letter] ?? 0),
		);
	}
	return common.flatMap((count, letter) =>
		new Array<string>(count).fill(String.fromCharCode(97 + letter)),
	);
};
