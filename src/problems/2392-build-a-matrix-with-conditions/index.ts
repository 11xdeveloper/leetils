/**
 * 2392. Build a Matrix With Conditions
 *
 * Places each number 1 to `k` once in a `k × k` matrix (other cells 0) so
 * that each `[above, below]` row condition and `[left, right]` column
 * condition holds. Returns the matrix, or `[]` if impossible.
 *
 * Rows and columns are independent: topologically sort the numbers under
 * each set of conditions, and place each number at its two positions.
 *
 * @see https://leetcode.com/problems/build-a-matrix-with-conditions/
 * @difficulty Hard
 * @timeComplexity O(k^2 + r + c)
 * @spaceComplexity O(k^2)
 *
 * @example
 * buildAMatrixWithConditions(3, [[1, 2], [3, 2]], [[2, 1], [3, 2]]); // [[3, 0, 0], [0, 0, 1], [0, 2, 0]]
 */
export const buildAMatrixWithConditions = (
	k: number,
	rowConditions: readonly (readonly number[])[],
	colConditions: readonly (readonly number[])[],
): number[][] => {
	/** Each number's position in a topological order, or undefined on a cycle. */
	const positions = (
		conditions: readonly (readonly number[])[],
	): number[] | undefined => {
		const after: number[][] = Array.from({ length: k + 1 }, () => []);
		const waiting = new Array<number>(k + 1).fill(0);
		for (const [first = 0, second = 0] of conditions) {
			after[first]?.push(second);
			waiting[second] = (waiting[second] ?? 0) + 1;
		}
		const order: number[] = [];
		for (let num = 1; num <= k; num++) if (!waiting[num]) order.push(num);
		for (let head = 0; head < order.length; head++) {
			for (const next of after[order[head] ?? 0] ?? []) {
				waiting[next] = (waiting[next] ?? 0) - 1;
				if (waiting[next] === 0) order.push(next);
			}
		}
		if (order.length < k) return undefined;
		const position = new Array<number>(k + 1).fill(0);
		for (const [i, num] of order.entries()) position[num] = i;
		return position;
	};
	const rows = positions(rowConditions);
	const cols = positions(colConditions);
	if (!rows || !cols) return [];
	const matrix = Array.from({ length: k }, () => new Array<number>(k).fill(0));
	for (let num = 1; num <= k; num++)
		(matrix[rows[num] ?? 0] ?? [])[cols[num] ?? 0] = num;
	return matrix;
};
