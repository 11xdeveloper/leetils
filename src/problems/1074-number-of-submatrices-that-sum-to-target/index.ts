/**
 * 1074. Number of Submatrices That Sum to Target
 *
 * Counts the non-empty submatrices of `matrix` whose elements sum to
 * `target`.
 *
 * For each pair of top and bottom rows, the column sums between them form
 * an array, and the submatrices spanning those rows are its subarrays. So
 * it counts subarrays summing to `target` with prefix sums and a map.
 *
 * @see https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/
 * @difficulty Hard
 * @timeComplexity O(m^2 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfSubmatricesThatSumToTarget([[0, 1, 0], [1, 1, 1], [0, 1, 0]], 0); // 4
 */
export const numberOfSubmatricesThatSumToTarget = (
	matrix: readonly (readonly number[])[],
	target: number,
): number => {
	const cols = matrix[0]?.length ?? 0;
	let count = 0;
	for (let top = 0; top < matrix.length; top++) {
		const columnSums = new Array<number>(cols).fill(0);
		for (let bottom = top; bottom < matrix.length; bottom++) {
			for (let c = 0; c < cols; c++)
				columnSums[c] = (columnSums[c] ?? 0) + (matrix[bottom]?.[c] ?? 0);
			const seen = new Map([[0, 1]]);
			let sum = 0;
			for (const columnSum of columnSums) {
				sum += columnSum;
				count += seen.get(sum - target) ?? 0;
				seen.set(sum, (seen.get(sum) ?? 0) + 1);
			}
		}
	}
	return count;
};
