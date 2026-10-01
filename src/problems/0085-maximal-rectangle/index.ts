import { largestRectangleInHistogram } from "../0084-largest-rectangle-in-histogram";

/**
 * 85. Maximal Rectangle
 *
 * Returns the area of the largest rectangle containing only `"1"`s in a
 * binary matrix of `"0"`s and `"1"`s.
 *
 * Treats each row as the base of a histogram, where each column's bar is the
 * number of consecutive `"1"`s ending at that row. The largest rectangle is
 * the largest in any of these histograms, found with the solution to Largest
 * Rectangle in Histogram.
 *
 * @see https://leetcode.com/problems/maximal-rectangle/
 * @difficulty Hard
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximalRectangle([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]); // 6
 */
export const maximalRectangle = (
	matrix: readonly (readonly string[])[],
): number => {
	const heights = new Array<number>(matrix[0]?.length ?? 0).fill(0);
	let largest = 0;

	for (const row of matrix) {
		for (const [c, cell] of row.entries()) {
			heights[c] = cell === "1" ? (heights[c] ?? 0) + 1 : 0;
		}
		largest = Math.max(largest, largestRectangleInHistogram(heights));
	}

	return largest;
};
