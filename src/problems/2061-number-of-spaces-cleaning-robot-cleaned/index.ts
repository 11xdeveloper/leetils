/**
 * 2061. Number of Spaces Cleaning Robot Cleaned
 *
 * A robot starts at the top-left of `room` (0 is empty, 1 an object)
 * facing right. It moves straight, turning 90° clockwise whenever the
 * edge or an object blocks it, cleaning every cell it visits. Returns the
 * number of cells cleaned, running forever.
 *
 * Simulate until a (cell, direction) state repeats, after which the
 * robot loops.
 *
 * @see https://leetcode.com/problems/number-of-spaces-cleaning-robot-cleaned/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * numberOfSpacesCleaningRobotCleaned([[0, 0, 0], [1, 1, 0], [0, 0, 0]]); // 7
 */
export const numberOfSpacesCleaningRobotCleaned = (
	room: readonly (readonly number[])[],
): number => {
	const [rows, cols] = [room.length, room[0]?.length ?? 0];
	const moves = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];
	const seen = new Uint8Array(rows * cols);
	const cleaned = new Set<number>();
	let [row, col, direction] = [0, 0, 0];
	while (!((seen[row * cols + col] ?? 0) & (1 << direction))) {
		seen[row * cols + col] = (seen[row * cols + col] ?? 0) | (1 << direction);
		cleaned.add(row * cols + col);
		const [dr = 0, dc = 0] = moves[direction] ?? [];
		if (room[row + dr]?.[col + dc] === 0) [row, col] = [row + dr, col + dc];
		else direction = (direction + 1) % 4;
	}
	return cleaned.size;
};
