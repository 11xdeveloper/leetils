/**
 * 221. Maximal Square
 *
 * Returns the area of the largest square containing only `"1"`s in a binary
 * matrix of `"0"`s and `"1"`s.
 *
 * Dynamic programming: the largest square with its bottom-right corner at a
 * `"1"` is one bigger than the smallest of the squares ending just above,
 * just left and diagonally above-left of it. Keeps one row at a time.
 *
 * @see https://leetcode.com/problems/maximal-square/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]); // 4
 */
export const maximalSquare = (
	matrix: readonly (readonly string[])[],
): number => {
	const columns = matrix[0]?.length ?? 0;
	const sides = new Array<number>(columns + 1).fill(0);
	let largest = 0;

	for (const row of matrix) {
		let diagonal = 0;
		for (let c = 1; c <= columns; c++) {
			const above = sides[c] ?? 0;
			sides[c] =
				row[c - 1] === "1"
					? 1 + Math.min(above, sides[c - 1] ?? 0, diagonal)
					: 0;
			diagonal = above;
			largest = Math.max(largest, sides[c] ?? 0);
		}
	}

	return largest * largest;
};
