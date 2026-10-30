/**
 * 2201. Count Artifacts That Can Be Extracted
 *
 * Artifacts `[r1, c1, r2, c2]` are buried in an `n × n` grid. Counts those
 * whose every cell has been dug.
 *
 * Mark the dug cells, then check each artifact's cells (at most 4).
 *
 * @see https://leetcode.com/problems/count-artifacts-that-can-be-extracted/
 * @difficulty Medium
 * @timeComplexity O(a + d)
 * @spaceComplexity O(d)
 *
 * @example
 * countArtifactsThatCanBeExtracted(2, [[0, 0, 0, 0], [0, 1, 1, 1]], [[0, 0], [0, 1]]); // 1
 */
export const countArtifactsThatCanBeExtracted = (
	n: number,
	artifacts: readonly (readonly number[])[],
	dig: readonly (readonly number[])[],
): number => {
	const dug = new Set(dig.map(([r = 0, c = 0]) => r * n + c));
	return artifacts.filter(([r1 = 0, c1 = 0, r2 = 0, c2 = 0]) => {
		for (let r = r1; r <= r2; r++)
			for (let c = c1; c <= c2; c++) if (!dug.has(r * n + c)) return false;
		return true;
	}).length;
};
