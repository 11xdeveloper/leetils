/**
 * 1901. Find a Peak Element II
 *
 * Returns the position of any element of `mat` (no two neighbours equal)
 * larger than its four neighbours, treating the outside as -1.
 *
 * Binary search over rows: take the largest element of the middle row; if
 * the row below holds something larger beneath it, a peak lies below,
 * otherwise at or above. The column maximum is never smaller than its
 * row neighbours.
 *
 * @see https://leetcode.com/problems/find-a-peak-element-ii/
 * @difficulty Medium
 * @timeComplexity O(n log m)
 * @spaceComplexity O(1)
 *
 * @example
 * findAPeakElementII([[10, 20, 15], [21, 30, 14], [7, 16, 32]]); // [1, 1]
 */
export const findAPeakElementII = (
	mat: readonly (readonly number[])[],
): number[] => {
	const largestIn = (row: number) => {
		const values = mat[row] ?? [];
		let best = 0;
		for (let c = 1; c < values.length; c++)
			if ((values[c] ?? 0) > (values[best] ?? 0)) best = c;
		return best;
	};
	let [low, high] = [0, mat.length - 1];
	while (low < high) {
		const mid = (low + high) >>> 1;
		const col = largestIn(mid);
		if ((mat[mid]?.[col] ?? 0) < (mat[mid + 1]?.[col] ?? 0)) low = mid + 1;
		else high = mid;
	}
	return [low, largestIn(low)];
};
