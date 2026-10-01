/**
 * 1198. Find Smallest Common Element in All Rows
 *
 * Every row of `mat` is strictly increasing. Returns the smallest value
 * found in every row, or -1 if there's none.
 *
 * Counts how many rows each value appears in (at most once per row, as rows
 * are strictly increasing), then checks the first row's values in order.
 *
 * @see https://leetcode.com/problems/find-smallest-common-element-in-all-rows/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * findSmallestCommonElementInAllRows([[1, 2, 3], [2, 3, 4], [2, 3, 5]]); // 2
 */
export const findSmallestCommonElementInAllRows = (
	mat: readonly (readonly number[])[],
): number => {
	const rows = new Map<number, number>();
	for (const row of mat) {
		for (const value of row) rows.set(value, (rows.get(value) ?? 0) + 1);
	}
	return mat[0]?.find((value) => rows.get(value) === mat.length) ?? -1;
};
