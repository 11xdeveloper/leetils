/**
 * 3189. Minimum Moves to Get a Peaceful Board
 *
 * `n` rooks on an n × n board each move one step up, down, left or right
 * at a time. Returns the fewest moves to leave exactly one rook in every
 * row and column.
 *
 * Rows and columns are independent: sort the rooks' rows and send the i-th
 * to row i, and the same for columns.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-get-a-peaceful-board/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumMovesToGetAPeacefulBoard([[0, 0], [1, 0], [1, 1]]); // 3
 */
export const minimumMovesToGetAPeacefulBoard = (
	rooks: readonly (readonly number[])[],
): number => {
	let moves = 0;
	for (const axis of [0, 1]) {
		const sorted = rooks.map((rook) => rook[axis] ?? 0).sort((a, b) => a - b);
		sorted.forEach((value, i) => {
			moves += Math.abs(value - i);
		});
	}
	return moves;
};
