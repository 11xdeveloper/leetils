/**
 * 127. Word Ladder
 *
 * Returns the number of words in the shortest transformation sequence from
 * `beginWord` to `endWord`, changing one letter at a time, where every word
 * after the first must be in `wordList`. Returns 0 if there is none.
 *
 * Breadth-first search from both ends at once, always expanding the smaller
 * frontier, until the frontiers meet. Neighbours are found by trying each
 * letter at each position.
 *
 * @see https://leetcode.com/problems/word-ladder/
 * @difficulty Hard
 * @timeComplexity O(n * L * 26) where L is the word length
 * @spaceComplexity O(n * L)
 *
 * @example
 * wordLadder("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]); // 5: hit → hot → dot → dog → cog
 */
export const wordLadder = (
	beginWord: string,
	endWord: string,
	wordList: readonly string[],
): number => {
	const unvisited = new Set(wordList);
	if (!unvisited.has(endWord)) return 0;

	let fromBegin = new Set([beginWord]);
	let fromEnd = new Set([endWord]);
	unvisited.delete(beginWord);
	unvisited.delete(endWord);

	for (let length = 2; fromBegin.size > 0 && fromEnd.size > 0; length++) {
		if (fromBegin.size > fromEnd.size)
			[fromBegin, fromEnd] = [fromEnd, fromBegin];

		const next = new Set<string>();
		for (const word of fromBegin) {
			for (let i = 0; i < word.length; i++) {
				for (let code = 97; code <= 122; code++) {
					const neighbour =
						word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1);
					if (fromEnd.has(neighbour)) return length;
					if (unvisited.has(neighbour)) {
						unvisited.delete(neighbour);
						next.add(neighbour);
					}
				}
			}
		}
		fromBegin = next;
	}

	return 0;
};
