/**
 * 1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix
 *
 * A step flips a cell and its four neighbours. Returns the fewest steps to
 * turn the binary matrix `mat` (at most 3 × 3) into all zeros, or -1.
 *
 * Flipping a cell twice undoes it and the order doesn't matter, so a
 * solution is a set of cells. With at most 9 cells, try all 2^9 sets, each
 * as a bitmask whose flips XOR together.
 *
 * @see https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/
 * @difficulty Hard
 * @timeComplexity O(2^(mn) · mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * minimumNumberOfFlipsToConvertBinaryMatrixToZeroMatrix([[0, 0], [0, 1]]); // 3
 */
export const minimumNumberOfFlipsToConvertBinaryMatrixToZeroMatrix = (
	mat: readonly (readonly number[])[],
): number => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	let start = 0;
	const flips: number[] = [];
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			if (mat[r]?.[c] === 1) start |= 1 << (r * n + c);
			let flip = 1 << (r * n + c);
			if (r > 0) flip |= 1 << ((r - 1) * n + c);
			if (r < m - 1) flip |= 1 << ((r + 1) * n + c);
			if (c > 0) flip |= 1 << (r * n + c - 1);
			if (c < n - 1) flip |= 1 << (r * n + c + 1);
			flips.push(flip);
		}
	}
	let fewest = Infinity;
	for (let chosen = 0; chosen < 2 ** flips.length; chosen++) {
		let [state, steps] = [start, 0];
		flips.forEach((flip, i) => {
			if (!(chosen & (1 << i))) return;
			state ^= flip;
			steps++;
		});
		if (state === 0) fewest = Math.min(fewest, steps);
	}
	return fewest === Infinity ? -1 : fewest;
};
