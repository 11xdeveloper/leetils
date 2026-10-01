/**
 * 1738. Find Kth Largest XOR Coordinate Value
 *
 * The value of coordinate `(a, b)` is the XOR of `matrix[i][j]` over all
 * `i ≤ a` and `j ≤ b`. Returns the `k`-th largest value.
 *
 * Two-dimensional prefix XORs give every value, then sort.
 *
 * @see https://leetcode.com/problems/find-kth-largest-xor-coordinate-value/
 * @difficulty Medium
 * @timeComplexity O(mn log mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * findKthLargestXorCoordinateValue([[5, 2], [1, 6]], 2); // 5
 */
export const findKthLargestXorCoordinateValue = (
	matrix: readonly (readonly number[])[],
	k: number,
): number => {
	const cols = matrix[0]?.length ?? 0;
	const values: number[] = [];
	let above = new Array<number>(cols).fill(0);
	for (const row of matrix) {
		const current: number[] = [];
		let rowPrefix = 0;
		for (let c = 0; c < cols; c++) {
			rowPrefix ^= row[c] ?? 0;
			current.push(rowPrefix ^ (above[c] ?? 0));
		}
		values.push(...current);
		above = current;
	}
	return values.sort((x, y) => y - x)[k - 1] ?? 0;
};
