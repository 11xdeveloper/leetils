/**
 * 2273. Find Resultant Array After Removing Anagrams
 *
 * Repeatedly deletes a word that is an anagram of the word before it.
 * Returns what remains.
 *
 * Keep each word whose sorted letters differ from the last kept word's.
 *
 * @see https://leetcode.com/problems/find-resultant-array-after-removing-anagrams/
 * @difficulty Easy
 * @timeComplexity O(total length · log length)
 * @spaceComplexity O(longest word)
 *
 * @example
 * findResultantArrayAfterRemovingAnagrams(["abba", "baba", "bbaa", "cd", "cd"]); // ["abba", "cd"]
 */
export const findResultantArrayAfterRemovingAnagrams = (
	words: readonly string[],
): string[] => {
	const kept: string[] = [];
	let previous = "";
	for (const word of words) {
		const key = [...word].sort().join("");
		if (key === previous) continue;
		kept.push(word);
		previous = key;
	}
	return kept;
};
