/**
 * 2135. Count Words Obtained After Adding a Letter
 *
 * A start word converts to a target by appending a letter it lacks and
 * rearranging. Counts the target words obtainable from some start word.
 * Words have distinct letters.
 *
 * Represent words as letter bitmasks. A target is obtainable when
 * removing one of its letters gives a start word's mask.
 *
 * @see https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/
 * @difficulty Medium
 * @timeComplexity O(26 · (n + m))
 * @spaceComplexity O(n)
 *
 * @example
 * countWordsObtainedAfterAddingALetter(["ant", "act", "tack"], ["tack", "act", "acti"]); // 2
 */
export const countWordsObtainedAfterAddingALetter = (
	startWords: readonly string[],
	targetWords: readonly string[],
): number => {
	const mask = (word: string): number => {
		let bits = 0;
		for (const char of word) bits |= 1 << (char.charCodeAt(0) - 97);
		return bits;
	};
	const starts = new Set(startWords.map(mask));
	return targetWords.filter((word) => {
		const bits = mask(word);
		return [...word].some((char) =>
			starts.has(bits ^ (1 << (char.charCodeAt(0) - 97))),
		);
	}).length;
};
