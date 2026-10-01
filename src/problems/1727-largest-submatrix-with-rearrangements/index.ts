/**
 * 1727. Largest Submatrix With Rearrangements
 *
 * With the columns of the binary `matrix` rearranged freely, returns the
 * largest area of a submatrix of ones.
 *
 * For each row as the bottom, count the consecutive ones ending there in
 * each column. Sorted in decreasing order, the `j`-th height can form a
 * rectangle `j + 1` columns wide.
 *
 * @see https://leetcode.com/problems/largest-submatrix-with-rearrangements/
 * @difficulty Medium
 * @timeComplexity O(m · n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestSubmatrixWithRearrangements([[0, 0, 1], [1, 1, 1], [1, 0, 1]]); // 4
 */
export const largestSubmatrixWithRearrangements = (
	matrix: readonly (readonly number[])[],
): number => {
	const heights = new Array<number>(matrix[0]?.length ?? 0).fill(0);
	let largest = 0;
	for (const row of matrix) {
		for (let c = 0; c < heights.length; c++)
			heights[c] = row[c] === 1 ? (heights[c] ?? 0) + 1 : 0;
		const sorted = heights.toSorted((a, b) => b - a);
		for (const [j, height] of sorted.entries())
			largest = Math.max(largest, height * (j + 1));
	}
	return largest;
};
