/**
 * 1253. Reconstruct a 2-Row Binary Matrix
 *
 * Returns a binary matrix with two rows summing to `upper` and `lower` and
 * columns summing to `colsum`, or `[]` if there's none.
 *
 * Columns summing to 2 need a 1 in both rows. Each column summing to 1
 * gives its 1 to the upper row while it still needs some, then the lower
 * row. It works exactly when both rows end up with the right totals.
 *
 * @see https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * reconstructA2RowBinaryMatrix(2, 1, [1, 1, 1]); // [[1, 1, 0], [0, 0, 1]]
 */
export const reconstructA2RowBinaryMatrix = (
	upper: number,
	lower: number,
	colsum: readonly number[],
): number[][] => {
	const twos = colsum.filter((sum) => sum === 2).length;
	let [upperLeft, lowerLeft] = [upper - twos, lower - twos];
	const top: number[] = [];
	const bottom: number[] = [];
	for (const sum of colsum) {
		if (sum === 2) {
			top.push(1);
			bottom.push(1);
		} else if (sum === 1 && upperLeft > 0) {
			top.push(1);
			bottom.push(0);
			upperLeft--;
		} else if (sum === 1) {
			top.push(0);
			bottom.push(1);
			lowerLeft--;
		} else {
			top.push(0);
			bottom.push(0);
		}
	}
	return upperLeft === 0 && lowerLeft === 0 ? [top, bottom] : [];
};
