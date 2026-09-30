/**
 * 737. Sentence Similarity II
 *
 * Two sentences (arrays of words) are similar if they have the same length
 * and each pair of words in the same position is similar, where similarity
 * comes from `similarPairs` and is reflexive, symmetric and transitive.
 *
 * Similar words form groups, found with union–find over the pairs. Two
 * words are similar exactly when they're equal or in the same group.
 *
 * @see https://leetcode.com/problems/sentence-similarity-ii/
 * @difficulty Medium
 * @timeComplexity O((n + p) · α(p)) for n words and p pairs
 * @spaceComplexity O(p)
 *
 * @example
 * sentenceSimilarityII(["I", "love", "leetcode"], ["I", "love", "onepiece"], [["manga", "onepiece"], ["platform", "anime"], ["leetcode", "platform"], ["anime", "manga"]]); // true
 */
export const sentenceSimilarityII = (
	sentence1: readonly string[],
	sentence2: readonly string[],
	similarPairs: readonly (readonly string[])[],
): boolean => {
	if (sentence1.length !== sentence2.length) return false;
	const parent = new Map<string, string>();
	const find = (word: string): string => {
		let root = word;
		while (parent.has(root) && parent.get(root) !== root)
			root = parent.get(root) ?? root;
		for (let node = word; node !== root; ) {
			const next = parent.get(node) ?? root;
			parent.set(node, root);
			node = next;
		}
		return root;
	};

	for (const [a = "", b = ""] of similarPairs) parent.set(find(a), find(b));
	return sentence1.every(
		(word, i) =>
			word === sentence2[i] || find(word) === find(sentence2[i] ?? ""),
	);
};
