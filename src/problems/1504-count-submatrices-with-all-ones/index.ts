/**
 * 1504. Count Submatrices With All Ones
 *
 * Returns how many rectangles in the binary matrix `mat` are all 1s.
 *
 * For each cell, `width[c]` is the run of 1s ending there in its row. A
 * rectangle with bottom-right corner `(r, c)` spanning rows `r' … r` can be
 * as wide as the narrowest of those runs, so walking upwards and tracking
 * that minimum counts every rectangle with that corner.
 *
 * @see https://leetcode.com/problems/count-submatrices-with-all-ones/
 * @difficulty Medium
 * @timeComplexity O(m^2 · n)
 * @spaceComplexity O(mn)
 *
 * @example
 * countSubmatricesWithAllOnes([[1, 0, 1], [1, 1, 0], [1, 1, 0]]); // 13
 */
export const countSubmatricesWithAllOnes = (
	mat: readonly (readonly number[])[],
): number => {
	const width = mat.map((row) => {
		let run = 0;
		return row.map((cell) => {
			run = cell === 1 ? run + 1 : 0;
			return run;
		});
	});
	let count = 0;
	for (let r = 0; r < mat.length; r++) {
		for (let c = 0; c < (mat[r]?.length ?? 0); c++) {
			let narrowest = Infinity;
			for (let top = r; top >= 0 && narrowest > 0; top--) {
				narrowest = Math.min(narrowest, width[top]?.[c] ?? 0);
				count += narrowest;
			}
		}
	}
	return count;
};
