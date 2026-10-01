/**
 * 598. Range Addition II
 *
 * An `m × n` matrix starts at 0, and each operation `[a, b]` adds 1 to
 * every cell in rows `0..a-1` and columns `0..b-1`. Returns how many cells
 * hold the maximum value afterwards.
 *
 * Every operation covers the top-left corner, so the maximum is in the
 * cells covered by all of them: the rectangle of the smallest `a` and the
 * smallest `b`.
 *
 * @see https://leetcode.com/problems/range-addition-ii/
 * @difficulty Easy
 * @timeComplexity O(k) for k operations
 * @spaceComplexity O(1)
 *
 * @example
 * rangeAdditionII(3, 3, [[2, 2], [3, 3]]); // 4
 */
export const rangeAdditionII = (
	m: number,
	n: number,
	ops: readonly (readonly number[])[],
): number => {
	let rows = m;
	let cols = n;
	for (const [a = m, b = n] of ops) {
		rows = Math.min(rows, a);
		cols = Math.min(cols, b);
	}
	return rows * cols;
};
