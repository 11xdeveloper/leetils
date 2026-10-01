/**
 * 1351. Count Negative Numbers in a Sorted Matrix
 *
 * `grid` is non-increasing along rows and columns. Returns how many of its
 * values are negative.
 *
 * A staircase walk: the first negative in each row can only move left going
 * down, so one pointer covers every row in `O(m + n)`.
 *
 * @see https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNegativeNumbersInASortedMatrix([[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]); // 8
 */
export const countNegativeNumbersInASortedMatrix = (
	grid: readonly (readonly number[])[],
): number => {
	const n = grid[0]?.length ?? 0;
	let [column, count] = [n, 0];
	for (const row of grid) {
		while (column > 0 && (row[column - 1] ?? 0) < 0) column--;
		count += n - column;
	}
	return count;
};
