/**
 * 1138. Alphabet Board Path
 *
 * On the board `["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]`,
 * starting at `a`, returns a shortest sequence of moves (`U`, `D`, `L`,
 * `R`) and presses (`!`) that types `target`.
 *
 * Each letter is a Manhattan-distance walk from the last. Moving up and
 * left before down and right keeps the walk on the board: `z` sits alone on
 * the last row, so it must be left upwards and entered from above.
 *
 * @see https://leetcode.com/problems/alphabet-board-path/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * alphabetBoardPath("leet"); // "DDR!UURRR!!DDD!"
 */
export const alphabetBoardPath = (target: string): string => {
	let [row, column] = [0, 0];
	let path = "";
	for (const char of target) {
		const index = char.charCodeAt(0) - 97;
		const [toRow, toColumn] = [Math.floor(index / 5), index % 5];
		path += "U".repeat(Math.max(0, row - toRow));
		path += "L".repeat(Math.max(0, column - toColumn));
		path += "D".repeat(Math.max(0, toRow - row));
		path += "R".repeat(Math.max(0, toColumn - column));
		path += "!";
		[row, column] = [toRow, toColumn];
	}
	return path;
};
