/**
 * 764. Largest Plus Sign
 *
 * An `n × n` grid is all 1s except the cells in `mines`. Returns the order
 * of the largest axis-aligned plus sign of 1s: a centre with four arms of
 * `order - 1` cells each. Returns 0 if there are no 1s.
 *
 * For each cell, the plus it centres is limited by the shortest run of 1s
 * reaching it from the four directions. Four sweeps (left, right, up,
 * down) compute those runs, keeping the minimum per cell.
 *
 * @see https://leetcode.com/problems/largest-plus-sign/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * largestPlusSign(5, [[4, 2]]); // 2
 */
export const largestPlusSign = (
	n: number,
	mines: readonly (readonly number[])[],
): number => {
	const mined = new Uint8Array(n * n);
	for (const [r = 0, c = 0] of mines) mined[r * n + c] = 1;
	const reach = new Array<number>(n * n).fill(n);

	for (let line = 0; line < n; line++) {
		const sweeps = [
			(i: number) => line * n + i,
			(i: number) => line * n + (n - 1 - i),
			(i: number) => i * n + line,
			(i: number) => (n - 1 - i) * n + line,
		];
		for (const cell of sweeps) {
			let run = 0;
			for (let i = 0; i < n; i++) {
				const index = cell(i);
				run = mined[index] ? 0 : run + 1;
				reach[index] = Math.min(reach[index] ?? 0, run);
			}
		}
	}

	return Math.max(...reach);
};
