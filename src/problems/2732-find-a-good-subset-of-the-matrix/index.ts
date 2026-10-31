/**
 * 2732. Find a Good Subset of the Matrix
 *
 * A non-empty set of `k` rows of a binary matrix is good if each column
 * sums to at most `⌊k / 2⌋`. Returns the sorted indices of a good set, or
 * `[]` if there is none.
 *
 * With at most 5 columns, a good set exists exactly when there's an
 * all-zero row or two rows with no 1 in common. Keep the first row for
 * each bitmask and try every pair of masks.
 *
 * @see https://leetcode.com/problems/find-a-good-subset-of-the-matrix/
 * @difficulty Hard
 * @timeComplexity O(m · n + 4ⁿ)
 * @spaceComplexity O(2ⁿ)
 *
 * @example
 * findAGoodSubsetOfTheMatrix([[0, 1, 1, 0], [0, 0, 0, 1], [1, 1, 1, 1]]); // [0, 1]
 */
export const findAGoodSubsetOfTheMatrix = (
	grid: readonly (readonly number[])[],
): number[] => {
	const firstWith = new Map<number, number>();
	for (const [r, row] of grid.entries()) {
		const mask = row.reduce((m, bit, c) => m | (bit << c), 0);
		if (mask === 0) return [r];
		if (!firstWith.has(mask)) firstWith.set(mask, r);
	}
	for (const [a, i] of firstWith)
		for (const [b, j] of firstWith)
			if ((a & b) === 0) return [Math.min(i, j), Math.max(i, j)];
	return [];
};
