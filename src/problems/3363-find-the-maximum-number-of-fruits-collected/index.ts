/**
 * 3363. Find the Maximum Number of Fruits Collected
 *
 * Three children start in the corners (0, 0), (0, n - 1) and (n - 1, 0) of
 * an n × n grid of fruits and each makes n - 1 moves to (n - 1, n - 1):
 * the first moving down, right or diagonally down-right, the second moving
 * down (straight or diagonally), the third moving right (straight or
 * diagonally). A room's fruit is collected once. Returns the most fruit.
 *
 * With exactly n - 1 moves, the first child must take the main diagonal,
 * and the others can never usefully cross it: the second stays above and
 * the third below. So add the diagonal to two independent path dynamic
 * programs, one per side.
 *
 * @see https://leetcode.com/problems/find-the-maximum-number-of-fruits-collected/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheMaximumNumberOfFruitsCollected([[1, 2, 3, 4], [5, 6, 8, 7], [9, 10, 11, 12], [13, 14, 15, 16]]); // 100
 */
export const findTheMaximumNumberOfFruitsCollected = (
	fruits: readonly (readonly number[])[],
): number => {
	const n = fruits.length;
	let total = 0;
	for (let i = 0; i < n; i++) total += fruits[i]?.[i] ?? 0;
	/** The best path from (0, n - 1) down to row n - 2 above the diagonal, reading cells through `at`. */
	const side = (at: (row: number, col: number) => number): number => {
		let best = new Float64Array(n).fill(Number.NEGATIVE_INFINITY);
		best[n - 1] = at(0, n - 1);
		for (let row = 1; row < n - 1; row++) {
			const next = new Float64Array(n).fill(Number.NEGATIVE_INFINITY);
			for (let col = row + 1; col < n; col++) {
				const from = Math.max(
					best[col - 1] ?? Number.NEGATIVE_INFINITY,
					best[col] ?? Number.NEGATIVE_INFINITY,
					best[col + 1] ?? Number.NEGATIVE_INFINITY,
				);
				next[col] = from + at(row, col);
			}
			best = next;
		}
		return best[n - 1] ?? 0;
	};
	return (
		total +
		side((row, col) => fruits[row]?.[col] ?? 0) +
		side((row, col) => fruits[col]?.[row] ?? 0)
	);
};
