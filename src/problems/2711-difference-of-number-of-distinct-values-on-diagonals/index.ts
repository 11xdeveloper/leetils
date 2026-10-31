/**
 * 2711. Difference of Number of Distinct Values on Diagonals
 *
 * For each cell, returns the absolute difference between the number of
 * distinct values on its diagonal above-left of it and below-right.
 *
 * Walk each diagonal forwards, recording distinct values seen before
 * each cell, then backwards for those after.
 *
 * @see https://leetcode.com/problems/difference-of-number-of-distinct-values-on-diagonals/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * differenceOfNumberOfDistinctValuesOnDiagonals([[1, 2, 3], [3, 1, 5], [3, 2, 1]]); // [[1, 1, 0], [1, 0, 1], [0, 1, 1]]
 */
export const differenceOfNumberOfDistinctValuesOnDiagonals = (
	grid: readonly (readonly number[])[],
): number[][] => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const answer = grid.map((row) => row.map(() => 0));
	const starts: [number, number][] = [];
	for (let c = 0; c < cols; c++) starts.push([0, c]);
	for (let r = 1; r < rows; r++) starts.push([r, 0]);

	for (const [r0, c0] of starts) {
		const length = Math.min(rows - r0, cols - c0);
		const before: number[] = [];
		const seen = new Set<number>();
		for (let k = 0; k < length; k++) {
			before.push(seen.size);
			seen.add(grid[r0 + k]?.[c0 + k] ?? 0);
		}
		seen.clear();
		for (let k = length - 1; k >= 0; k--) {
			(answer[r0 + k] ?? [])[c0 + k] = Math.abs((before[k] ?? 0) - seen.size);
			seen.add(grid[r0 + k]?.[c0 + k] ?? 0);
		}
	}
	return answer;
};
