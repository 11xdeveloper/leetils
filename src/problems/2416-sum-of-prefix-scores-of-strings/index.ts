/**
 * 2416. Sum of Prefix Scores of Strings
 *
 * A string's score is how many words it prefixes. Returns, for each word,
 * the total score of its non-empty prefixes.
 *
 * Insert every word into a trie counting the words through each node; a
 * word's answer sums the counts along its path.
 *
 * @see https://leetcode.com/problems/sum-of-prefix-scores-of-strings/
 * @difficulty Hard
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * sumOfPrefixScoresOfStrings(["abc", "ab", "bc", "b"]); // [5, 4, 3, 2]
 */
export const sumOfPrefixScoresOfStrings = (
	words: readonly string[],
): number[] => {
	const children = new Map<number, number>();
	const count = [0];
	const walk = (word: string, visit: (node: number) => void): void => {
		let node = 0;
		for (const char of word) {
			const key = node * 26 + char.charCodeAt(0) - 97;
			let next = children.get(key);
			if (next === undefined) {
				next = count.length;
				count.push(0);
				children.set(key, next);
			}
			node = next;
			visit(node);
		}
	};
	for (const word of words)
		walk(word, (node) => {
			count[node] = (count[node] ?? 0) + 1;
		});
	return words.map((word) => {
		let total = 0;
		walk(word, (node) => {
			total += count[node] ?? 0;
		});
		return total;
	});
};
