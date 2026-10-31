/**
 * 2018. Check if Word Can Be Placed In Crossword
 *
 * A crossword board holds letters, empty cells `" "` and blocked cells
 * `"#"`. Returns whether `word` fits a horizontal or vertical slot (read
 * either way) that is exactly its length, bounded by blocks or edges, and
 * agrees with the letters already there.
 *
 * Split every row and column at the blocks into slots and test the word
 * and its reverse against each slot of the right length.
 *
 * @see https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * checkIfWordCanBePlacedInCrossword([["#", " ", "#"], [" ", " ", "#"], ["#", "c", " "]], "abc"); // true
 */
export const checkIfWordCanBePlacedInCrossword = (
	board: readonly (readonly string[])[],
	word: string,
): boolean => {
	const columns = (board[0] ?? []).map((_, c) =>
		board.map((row) => row[c] ?? "#"),
	);
	const reversed = [...word].reverse().join("");
	const fits = (slot: string, candidate: string): boolean =>
		[...slot].every((cell, i) => cell === " " || cell === candidate[i]);
	return [...board, ...columns].some((line) =>
		line
			.join("")
			.split("#")
			.some(
				(slot) =>
					slot.length === word.length &&
					(fits(slot, word) || fits(slot, reversed)),
			),
	);
};
