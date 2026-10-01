/**
 * 1337. The K Weakest Rows in a Matrix
 *
 * Each row of `mat` has its soldiers (1s) before its civilians (0s). A row
 * is weaker with fewer soldiers, or the same number and a smaller index.
 * Returns the indices of the `k` weakest rows, weakest first.
 *
 * Counts each row's soldiers by binary searching for its first 0, then
 * sorts the rows (a stable sort keeps equal rows in index order).
 *
 * @see https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/
 * @difficulty Easy
 * @timeComplexity O(m log n + m log m)
 * @spaceComplexity O(m)
 *
 * @example
 * theKWeakestRowsInAMatrix([[1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0]], 2); // [0, 2]
 */
export const theKWeakestRowsInAMatrix = (
	mat: readonly (readonly number[])[],
	k: number,
): number[] => {
	const soldiers = mat.map((row) => {
		let [low, high] = [0, row.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if (row[mid] === 1) low = mid + 1;
			else high = mid;
		}
		return low;
	});
	return soldiers
		.map((_, i) => i)
		.sort((a, b) => (soldiers[a] ?? 0) - (soldiers[b] ?? 0))
		.slice(0, k);
};
