/**
 * 126. Word Ladder II
 *
 * Returns every shortest transformation sequence from `beginWord` to
 * `endWord`, changing one letter at a time, where every word after the first
 * must be in `wordList`. Returns an empty array if there is none.
 *
 * Breadth-first search a level at a time from `beginWord`, recording for
 * each newly reached word every word on the previous level that leads to it.
 * Once `endWord` is reached, walks those links back to build every shortest
 * sequence. Neighbours are found by trying each letter at each position,
 * which is faster than comparing against every word when the list is long.
 *
 * @see https://leetcode.com/problems/word-ladder-ii/
 * @difficulty Hard
 * @timeComplexity O(n * L * 26 + P) where L is the word length and P is the total length of the returned sequences
 * @spaceComplexity O(n * L + P)
 *
 * @example
 * wordLadderII("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]);
 * // [["hit", "hot", "dot", "dog", "cog"], ["hit", "hot", "lot", "log", "cog"]]
 */
export const wordLadderII = (
	beginWord: string,
	endWord: string,
	wordList: readonly string[],
): string[][] => {
	const unvisited = new Set(wordList);
	if (!unvisited.has(endWord)) return [];
	unvisited.delete(beginWord);

	const parents = new Map<string, string[]>();
	let level = [beginWord];
	let found = false;

	while (level.length > 0 && !found) {
		const nextLevel = new Set<string>();
		for (const word of level) {
			for (let i = 0; i < word.length; i++) {
				for (let code = 97; code <= 122; code++) {
					const neighbour =
						word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1);
					if (!unvisited.has(neighbour)) continue;
					nextLevel.add(neighbour);
					parents.set(neighbour, [...(parents.get(neighbour) ?? []), word]);
					if (neighbour === endWord) found = true;
				}
			}
		}
		// Only remove words once the whole level is done, so every word on this
		// level can be recorded as a parent.
		for (const word of nextLevel) unvisited.delete(word);
		level = [...nextLevel];
	}

	if (!found) return [];

	const sequences: string[][] = [];
	const path = [endWord];
	const walkBack = (word: string): void => {
		if (word === beginWord) {
			sequences.push(path.toReversed());
			return;
		}
		for (const parent of parents.get(word) ?? []) {
			path.push(parent);
			walkBack(parent);
			path.pop();
		}
	};
	walkBack(endWord);

	return sequences;
};
