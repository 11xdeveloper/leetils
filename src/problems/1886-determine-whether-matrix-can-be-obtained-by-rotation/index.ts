/**
 * 1886. Determine Whether Matrix Can Be Obtained By Rotation
 *
 * Returns whether rotating the square `mat` by some multiple of 90° gives
 * `target`.
 *
 * Compare each cell against the four rotated positions at once.
 *
 * @see https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * determineWhetherMatrixCanBeObtainedByRotation([[0, 1], [1, 0]], [[1, 0], [0, 1]]); // true
 */
export const determineWhetherMatrixCanBeObtainedByRotation = (
	mat: readonly (readonly number[])[],
	target: readonly (readonly number[])[],
): boolean => {
	const n = mat.length;
	const possible = [true, true, true, true];
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			const value = mat[r]?.[c];
			if (value !== target[r]?.[c]) possible[0] = false;
			if (value !== target[c]?.[n - 1 - r]) possible[1] = false;
			if (value !== target[n - 1 - r]?.[n - 1 - c]) possible[2] = false;
			if (value !== target[n - 1 - c]?.[r]) possible[3] = false;
		}
	}
	return possible.some(Boolean);
};
