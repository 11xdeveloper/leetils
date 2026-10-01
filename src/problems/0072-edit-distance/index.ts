/**
 * 72. Edit Distance
 *
 * Returns the fewest single-character insertions, deletions and replacements
 * that turn `word1` into `word2` (the Levenshtein distance).
 *
 * Dynamic programming over prefixes: the distance between the first `i`
 * characters of `word1` and the first `j` of `word2` comes from the three
 * neighbouring prefix pairs. Keeps one row of the table at a time.
 *
 * @see https://leetcode.com/problems/edit-distance/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * editDistance("horse", "ros"); // 3
 */
export const editDistance = (word1: string, word2: string): number => {
	let previous = Array.from({ length: word2.length + 1 }, (_, j) => j);

	for (let i = 1; i <= word1.length; i++) {
		const current = [i];
		for (let j = 1; j <= word2.length; j++) {
			current[j] =
				word1[i - 1] === word2[j - 1]
					? (previous[j - 1] ?? 0)
					: 1 +
						Math.min(
							previous[j - 1] ?? 0, // replace
							previous[j] ?? 0, // delete
							current[j - 1] ?? 0, // insert
						);
		}
		previous = current;
	}

	return previous[word2.length] ?? 0;
};
