/**
 * 1178. Number of Valid Words for Each Puzzle
 *
 * A word is valid for a 7-letter puzzle if it contains the puzzle's first
 * letter and uses only the puzzle's letters. Returns, for each puzzle, how
 * many words are valid.
 *
 * Counts the words by their set of letters, as a bitmask. A puzzle's valid
 * words are those whose set is a subset of the puzzle's containing its
 * first letter, and there are only 2^6 = 64 of those to look up.
 *
 * @see https://leetcode.com/problems/number-of-valid-words-for-each-puzzle/
 * @difficulty Hard
 * @timeComplexity O(total length of words + 64p) for p puzzles
 * @spaceComplexity O(w) for w words
 *
 * @example
 * numberOfValidWordsForEachPuzzle(["apple", "pleas", "please"], ["aelwxyz", "aelpxyz", "aelpsxy", "saelpxy", "xaelpsy"]); // [0, 1, 3, 2, 0]
 */
export const numberOfValidWordsForEachPuzzle = (
	words: readonly string[],
	puzzles: readonly string[],
): number[] => {
	const maskOf = (s: string) => {
		let mask = 0;
		for (let i = 0; i < s.length; i++) mask |= 1 << (s.charCodeAt(i) - 97);
		return mask;
	};
	const counts = new Map<number, number>();
	for (const word of words) {
		const mask = maskOf(word);
		counts.set(mask, (counts.get(mask) ?? 0) + 1);
	}
	return puzzles.map((puzzle) => {
		const first = 1 << (puzzle.charCodeAt(0) - 97);
		const rest = maskOf(puzzle) & ~first;
		let valid = 0;
		// Walks every subset of the other letters, from `rest` down to the empty set.
		for (let subset = rest; ; subset = (subset - 1) & rest) {
			valid += counts.get(subset | first) ?? 0;
			if (subset === 0) break;
		}
		return valid;
	});
};
