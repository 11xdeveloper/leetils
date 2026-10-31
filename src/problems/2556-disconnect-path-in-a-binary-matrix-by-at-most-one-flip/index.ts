/**
 * 2556. Disconnect Path in a Binary Matrix by at Most One Flip
 *
 * Moving only right or down through cells holding 1, returns whether
 * flipping at most one cell, other than the two corners, can leave no
 * path from the top-left to the bottom-right.
 *
 * Every path visits exactly one cell on each anti-diagonal. Find the
 * cells that are on some path; if an inner anti-diagonal has at most one
 * of them, flipping it (or nothing) disconnects the corners.
 *
 * @see https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * disconnectPathInABinaryMatrixByAtMostOneFlip([[1, 1, 1], [1, 0, 0], [1, 1, 1]]); // true
 */
export const disconnectPathInABinaryMatrixByAtMostOneFlip = (
	grid: readonly (readonly number[])[],
): boolean => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const open = (r: number, c: number): boolean => grid[r]?.[c] === 1;

	const fromStart = Array.from({ length: rows }, () => new Uint8Array(cols));
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++)
			if (open(r, c))
				(fromStart[r] ?? [])[c] =
					(r === 0 && c === 0) || fromStart[r - 1]?.[c] || fromStart[r]?.[c - 1]
						? 1
						: 0;

	const toEnd = Array.from({ length: rows }, () => new Uint8Array(cols));
	for (let r = rows - 1; r >= 0; r--)
		for (let c = cols - 1; c >= 0; c--)
			if (open(r, c))
				(toEnd[r] ?? [])[c] =
					(r === rows - 1 && c === cols - 1) ||
					toEnd[r + 1]?.[c] ||
					toEnd[r]?.[c + 1]
						? 1
						: 0;

	const onPath = Array.from({ length: rows + cols - 1 }, () => 0);
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++)
			if (fromStart[r]?.[c] && toEnd[r]?.[c])
				onPath[r + c] = (onPath[r + c] ?? 0) + 1;

	if (!onPath[0]) return true;
	for (let d = 1; d < rows + cols - 2; d++)
		if ((onPath[d] ?? 0) <= 1) return true;
	return false;
};
