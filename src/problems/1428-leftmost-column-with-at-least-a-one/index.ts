/** The interface LeetCode provides for reading the matrix. */
interface BinaryMatrix {
	get(row: number, col: number): number;
	dimensions(): number[];
}

/**
 * 1428. Leftmost Column with at Least a One
 *
 * Each row of the binary matrix is sorted (0s then 1s). Using only
 * `binaryMatrix.get` (at most 1000 calls) and `dimensions`, returns the
 * leftmost column containing a 1, or -1.
 *
 * A staircase walk from the top-right: step left past each 1 and down past
 * each 0. That makes at most `rows + cols` reads.
 *
 * @see https://leetcode.com/problems/leftmost-column-with-at-least-a-one/
 * @difficulty Medium
 * @timeComplexity O(rows + cols) reads
 * @spaceComplexity O(1)
 *
 * @example
 * leftmostColumnWithAtLeastAOne({ get: (r, c) => [[0, 0], [0, 1]][r]?.[c] ?? 0, dimensions: () => [2, 2] }); // 1
 */
export const leftmostColumnWithAtLeastAOne = (
	binaryMatrix: BinaryMatrix,
): number => {
	const [rows = 0, cols = 0] = binaryMatrix.dimensions();
	let [row, col] = [0, cols - 1];
	let leftmost = -1;
	while (row < rows && col >= 0) {
		if (binaryMatrix.get(row, col) === 1) {
			leftmost = col;
			col--;
		} else {
			row++;
		}
	}
	return leftmost;
};
