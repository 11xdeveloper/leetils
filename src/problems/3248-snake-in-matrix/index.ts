const MOVES: Readonly<Record<string, [number, number]>> = {
	UP: [-1, 0],
	DOWN: [1, 0],
	LEFT: [0, -1],
	RIGHT: [0, 1],
};

/**
 * 3248. Snake in Matrix
 *
 * A snake starts in cell 0 of an n × n grid numbered row by row and follows
 * the commands. Returns the number of the cell it ends in.
 *
 * Track the row and column.
 *
 * @see https://leetcode.com/problems/snake-in-matrix/
 * @difficulty Easy
 * @timeComplexity O(c)
 * @spaceComplexity O(1)
 *
 * @example
 * snakeInMatrix(2, ["RIGHT", "DOWN"]); // 3
 */
export const snakeInMatrix = (
	n: number,
	commands: readonly string[],
): number => {
	let row = 0;
	let col = 0;
	for (const command of commands) {
		const [dr, dc] = MOVES[command] ?? [0, 0];
		row += dr;
		col += dc;
	}
	return row * n + col;
};
