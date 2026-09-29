/**
 * 269. Alien Dictionary
 *
 * `words` is claimed to be sorted by an unknown order of the letters it
 * uses. Returns the letters in some order consistent with that, or `""` if
 * no order is.
 *
 * Each pair of neighbouring words gives at most one rule: at their first
 * differing position, the first word's letter comes first. (If one word is
 * a longer word's prefix but comes after it, no order works.) A topological
 * sort of those rules with Kahn's algorithm gives an order, or finds a
 * cycle.
 *
 * @see https://leetcode.com/problems/alien-dictionary/
 * @difficulty Hard
 * @timeComplexity O(C) where C is the total length of the words
 * @spaceComplexity O(1), at most 26 letters and 26² rules
 *
 * @example
 * alienDictionary(["wrt", "wrf", "er", "ett", "rftt"]); // "wertf"
 */
export const alienDictionary = (words: readonly string[]): string => {
	const after = new Map<string, Set<string>>();
	for (const word of words)
		for (const char of word) if (!after.has(char)) after.set(char, new Set());

	for (let i = 1; i < words.length; i++) {
		const previous = words[i - 1] ?? "";
		const word = words[i] ?? "";
		const differs = [...previous].findIndex((char, j) => char !== word[j]);
		if (differs === -1) {
			if (previous.length > word.length) return "";
			continue;
		}
		if (differs >= word.length) return "";
		after.get(previous.charAt(differs))?.add(word.charAt(differs));
	}

	const before = new Map([...after.keys()].map((char) => [char, 0]));
	for (const nexts of after.values()) {
		for (const next of nexts) before.set(next, (before.get(next) ?? 0) + 1);
	}

	const order = [...before]
		.filter(([, count]) => count === 0)
		.map(([char]) => char);
	for (let head = 0; head < order.length; head++) {
		for (const next of after.get(order[head] ?? "") ?? []) {
			const count = (before.get(next) ?? 0) - 1;
			before.set(next, count);
			if (count === 0) order.push(next);
		}
	}

	return order.length === after.size ? order.join("") : "";
};
