/**
 * 1258. Synonymous Sentences
 *
 * `synonyms` pairs up equivalent words (and equivalence is transitive).
 * Returns every sentence made by swapping words of `text` for synonyms,
 * sorted.
 *
 * Groups the synonyms with union–find, then builds the sentences word by
 * word, each word branching into its group (or just itself).
 *
 * @see https://leetcode.com/problems/synonymous-sentences/
 * @difficulty Medium
 * @timeComplexity O(s · w) for s sentences of w words, plus sorting them
 * @spaceComplexity O(s · w)
 *
 * @example
 * synonymousSentences([["happy", "joy"], ["cheerful", "glad"]], "I am happy today but was sad yesterday");
 * // ["I am happy today but was sad yesterday", "I am joy today but was sad yesterday"]
 */
export const synonymousSentences = (
	synonyms: readonly (readonly string[])[],
	text: string,
): string[] => {
	const parent = new Map<string, string>();
	const find = (word: string): string => {
		let root = word;
		for (
			let up = parent.get(root);
			up !== undefined && up !== root;
			up = parent.get(root)
		)
			root = up;
		return root;
	};
	for (const [a = "", b = ""] of synonyms) {
		if (!parent.has(a)) parent.set(a, a);
		if (!parent.has(b)) parent.set(b, b);
		parent.set(find(a), find(b));
	}
	const groups = new Map<string, string[]>();
	for (const word of parent.keys()) {
		const root = find(word);
		const group = groups.get(root);
		if (group) group.push(word);
		else groups.set(root, [word]);
	}
	let sentences = [""];
	for (const word of text.split(" ")) {
		const options = parent.has(word)
			? (groups.get(find(word)) ?? [word])
			: [word];
		sentences = sentences.flatMap((sentence) =>
			options.map((option) =>
				sentence === "" ? option : `${sentence} ${option}`,
			),
		);
	}
	return sentences.sort();
};
