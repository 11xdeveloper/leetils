/**
 * 562. Longest Line of Consecutive One in Matrix
 *
 * Returns the length of the longest line of consecutive 1s in the binary
 * matrix `mat`, horizontally, vertically, diagonally or anti-diagonally.
 *
 * For each cell, the lines of 1s ending there in each direction extend the
 * lines ending at its neighbour to the left, above, above-left and
 * above-right. Only the previous row's counts are kept.
 *
 * @see https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestLineOfConsecutiveOneInMatrix([[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 1]]); // 3
 */
export const longestLineOfConsecutiveOneInMatrix = (
	mat: readonly (readonly number[])[],
): number => {
	const n = mat[0]?.length ?? 0;
	// Per column: lines ending there going [horizontal, vertical, diagonal, anti-diagonal].
	let previous: number[][] = Array.from({ length: n }, () => [0, 0, 0, 0]);
	let longest = 0;

	for (const row of mat) {
		const current: number[][] = Array.from({ length: n }, () => [0, 0, 0, 0]);
		for (const [c, cell] of row.entries()) {
			if (cell !== 1) continue;
			const lines = [
				(current[c - 1]?.[0] ?? 0) + 1,
				(previous[c]?.[1] ?? 0) + 1,
				(previous[c - 1]?.[2] ?? 0) + 1,
				(previous[c + 1]?.[3] ?? 0) + 1,
			];
			current[c] = lines;
			longest = Math.max(longest, ...lines);
		}
		previous = current;
	}

	return longest;
};
