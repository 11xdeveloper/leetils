/**
 * 527. Word Abbreviation
 *
 * Abbreviates each of the distinct `words` as a prefix, the number of
 * letters skipped, and the last letter (`"internal"` → `"i6l"`). Words whose
 * abbreviations clash all lengthen their prefixes by one letter, repeatedly,
 * until every abbreviation is unique. An abbreviation that isn't shorter
 * than its word is replaced by the word.
 *
 * Abbreviations can only clash between words of the same length and last
 * letter, and two such words stop clashing once the prefix goes past their
 * longest common prefix. So within each group, sorted, a word's prefix is
 * one letter longer than its longest common prefix with either neighbour,
 * which is the largest with any word in the group.
 *
 * @see https://leetcode.com/problems/word-abbreviation/
 * @difficulty Hard
 * @timeComplexity O(n log n · L) for n words of length up to L
 * @spaceComplexity O(n · L)
 *
 * @example
 * wordAbbreviation(["like", "god", "internal", "me", "internet", "interval", "intension", "face", "intrusion"]);
 * // ["l2e", "god", "internal", "me", "i6t", "interval", "inte4n", "f2e", "intr4n"]
 */
export const wordAbbreviation = (words: readonly string[]): string[] => {
	const commonPrefix = (a: string, b: string): number => {
		let length = 0;
		while (length < a.length && a.charAt(length) === b.charAt(length)) length++;
		return length;
	};

	const groups = new Map<string, number[]>();
	for (const [i, word] of words.entries()) {
		const key = `${word.length}${word.at(-1)}`;
		const group = groups.get(key);
		if (group) group.push(i);
		else groups.set(key, [i]);
	}

	const result = [...words];
	for (const group of groups.values()) {
		group.sort((a, b) => ((words[a] ?? "") < (words[b] ?? "") ? -1 : 1));
		for (const [position, index] of group.entries()) {
			const word = words[index] ?? "";
			const before =
				position > 0
					? commonPrefix(word, words[group[position - 1] ?? 0] ?? "")
					: 0;
			const after =
				position + 1 < group.length
					? commonPrefix(word, words[group[position + 1] ?? 0] ?? "")
					: 0;
			const prefix = Math.max(before, after) + 1;
			const abbreviation = `${word.slice(0, prefix)}${word.length - prefix - 1}${word.at(-1)}`;
			if (abbreviation.length < word.length) result[index] = abbreviation;
		}
	}

	return result;
};
