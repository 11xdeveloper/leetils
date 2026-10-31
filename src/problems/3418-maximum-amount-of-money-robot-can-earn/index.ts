/**
 * 3418. Maximum Amount of Money Robot Can Earn
 *
 * A robot moves right or down from the top-left to the bottom-right of the
 * grid, gaining each cell's coins; negative cells are robbers, and it can
 * neutralise up to two of them to avoid the loss. Returns the most it can
 * end with.
 *
 * Path dynamic programming, tracking how many neutralisations are left.
 *
 * @see https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAmountOfMoneyRobotCanEarn([[0, 1, -1], [1, -2, 3], [2, -3, 4]]); // 8
 */
export const maximumAmountOfMoneyRobotCanEarn = (
	coins: readonly (readonly number[])[],
): number => {
	const n = coins[0]?.length ?? 0;
	const NONE = Number.NEGATIVE_INFINITY;
	let above = Array.from({ length: n }, () => [NONE, NONE, NONE]);
	coins.forEach((row, r) => {
		const current = Array.from({ length: n }, () => [NONE, NONE, NONE]);
		row.forEach((value, c) => {
			for (let used = 0; used <= 2; used++) {
				const from = (k: number): number =>
					r === 0 && c === 0
						? k === 0
							? 0
							: NONE
						: Math.max(above[c]?.[k] ?? NONE, current[c - 1]?.[k] ?? NONE);
				let best = from(used) + value;
				if (value < 0 && used > 0) best = Math.max(best, from(used - 1));
				const cell = current[c];
				if (cell) cell[used] = best;
			}
		});
		above = current;
	});
	return Math.max(...(above[n - 1] ?? [0]));
};
