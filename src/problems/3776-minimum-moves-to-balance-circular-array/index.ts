/**
 * 3776. Minimum Moves to Balance Circular Array
 *
 * In the circular array `balance`, at most one entry is negative. A move
 * shifts one unit to a neighbour. Returns the fewest moves making every
 * entry non-negative, or -1.
 *
 * Fill the deficit from the nearest surpluses first, widening the
 * distance one step at a time on both sides.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-balance-circular-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToBalanceCircularArray([1, 2, -5, 2]); // 6
 */
export const minimumMovesToBalanceCircularArray = (
	balance: readonly number[],
): number => {
	const n = balance.length;
	if (balance.reduce((a, b) => a + b, 0) < 0) return -1;
	const at = balance.findIndex((b) => b < 0);
	if (at < 0) return 0;
	let need = -(balance[at] ?? 0);
	let moves = 0;
	for (let d = 1; need > 0 && d <= Math.floor(n / 2); d++) {
		const sides = new Set([(at + d) % n, (at - d + n) % n]);
		for (const i of sides) {
			const take = Math.min(need, balance[i] ?? 0);
			need -= take;
			moves += take * d;
		}
	}
	return moves;
};
