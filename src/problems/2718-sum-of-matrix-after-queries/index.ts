/**
 * 2718. Sum of Matrix After Queries
 *
 * An `n × n` zero matrix is updated by queries `[type, index, val]`:
 * type 0 sets a whole row to `val`, type 1 a whole column. Returns the
 * final sum.
 *
 * Replay the queries backwards: only the last write to a row or column
 * counts, and it covers the cells not claimed by later writes the other
 * way.
 *
 * @see https://leetcode.com/problems/sum-of-matrix-after-queries/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfMatrixAfterQueries(3, [[0, 0, 1], [1, 2, 2], [0, 2, 3], [1, 0, 4]]); // 23
 */
export const sumOfMatrixAfterQueries = (
	n: number,
	queries: readonly (readonly number[])[],
): number => {
	const done = [new Uint8Array(n), new Uint8Array(n)];
	const remaining = [n, n];
	let sum = 0;
	for (let i = queries.length - 1; i >= 0; i--) {
		const [type = 0, index = 0, val = 0] = queries[i] ?? [];
		const seen = done[type] ?? new Uint8Array(n);
		if (seen[index]) continue;
		seen[index] = 1;
		sum += val * (remaining[1 - type] ?? 0);
		remaining[type] = (remaining[type] ?? 0) - 1;
	}
	return sum;
};
