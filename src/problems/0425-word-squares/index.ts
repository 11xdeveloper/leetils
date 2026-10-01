/**
 * 425. Word Squares
 *
 * Returns every word square that can be built from the distinct, equal
 * length words given (reusing words is allowed). In a word square the `k`th
 * row reads the same as the `k`th column.
 *
 * Builds squares row by row. Once `k` rows are placed, row `k` must start
 * with the `k`th letters of those rows, so only words with that prefix are
 * tried. A map from every prefix to its words makes each lookup direct.
 *
 * @see https://leetcode.com/problems/word-squares/
 * @difficulty Hard
 * @timeComplexity O(n · 26^L · L) in the worst case, where L is the word length
 * @spaceComplexity O(n · L)
 *
 * @example
 * wordSquares(["area", "lead", "wall", "lady", "ball"]);
 * // [["wall", "area", "lead", "lady"], ["ball", "area", "lead", "lady"]]
 */
export const wordSquares = (words: readonly string[]): string[][] => {
	const byPrefix = new Map<string, string[]>();
	for (const word of words) {
		for (let length = 0; length <= word.length; length++) {
			const prefix = word.slice(0, length);
			byPrefix.set(prefix, [...(byPrefix.get(prefix) ?? []), word]);
		}
	}

	const size = words[0]?.length ?? 0;
	const squares: string[][] = [];
	const rows: string[] = [];
	const build = (): void => {
		if (rows.length === size) {
			squares.push([...rows]);
			return;
		}
		const prefix = rows.map((row) => row[rows.length]).join("");
		for (const word of byPrefix.get(prefix) ?? []) {
			rows.push(word);
			build();
			rows.pop();
		}
	};

	build();
	return squares;
};
