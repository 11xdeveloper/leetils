/**
 * 1181. Before and After Puzzle
 *
 * Two different phrases can be merged when the last word of the first is
 * the first word of the second, sharing that word. Returns every distinct
 * merged phrase, sorted.
 *
 * Indexes the phrases by first word, then for each phrase merges it with
 * every other phrase starting with its last word.
 *
 * @see https://leetcode.com/problems/before-and-after-puzzle/
 * @difficulty Medium
 * @timeComplexity O(n^2 · L) for phrases up to L long
 * @spaceComplexity O(n^2 · L), for the result
 *
 * @example
 * beforeAndAfterPuzzle(["writing code", "code rocks"]); // ["writing code rocks"]
 */
export const beforeAndAfterPuzzle = (phrases: readonly string[]): string[] => {
	const firstWord = (phrase: string) => phrase.split(" ", 1)[0] ?? "";
	const byFirstWord = new Map<string, number[]>();
	phrases.forEach((phrase, i) => {
		const word = firstWord(phrase);
		const list = byFirstWord.get(word);
		if (list) list.push(i);
		else byFirstWord.set(word, [i]);
	});
	const puzzles = new Set<string>();
	phrases.forEach((phrase, i) => {
		const lastSpace = phrase.lastIndexOf(" ");
		const lastWord = phrase.slice(lastSpace + 1);
		for (const j of byFirstWord.get(lastWord) ?? []) {
			if (j === i) continue;
			puzzles.add(phrase.slice(0, lastSpace + 1) + (phrases[j] ?? ""));
		}
	});
	return [...puzzles].sort();
};
