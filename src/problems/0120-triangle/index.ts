/**
 * 120. Triangle
 *
 * Returns the smallest sum of a path from the top of a triangle of numbers to
 * its bottom row, where each step moves to one of the two adjacent numbers
 * in the row below.
 *
 * Dynamic programming from the bottom row up: the best path from each number
 * adds it to the better of the two best paths below it. One array of the
 * size of the bottom row holds the running results.
 *
 * @see https://leetcode.com/problems/triangle/
 * @difficulty Medium
 * @timeComplexity O(n^2) where n is the number of rows
 * @spaceComplexity O(n)
 *
 * @example
 * triangle([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]); // 11, along 2 → 3 → 5 → 1
 */
export const triangle = (rows: readonly (readonly number[])[]): number => {
	const best = [...(rows.at(-1) ?? [])];

	for (let r = rows.length - 2; r >= 0; r--) {
		for (const [i, value] of (rows[r] ?? []).entries()) {
			best[i] = value + Math.min(best[i] ?? 0, best[i + 1] ?? 0);
		}
	}

	return best[0] ?? 0;
};
