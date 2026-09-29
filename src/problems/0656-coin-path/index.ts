/**
 * 656. Coin Path
 *
 * From index 1 of `coins` (1-indexed), you jump 1 to `maxJump` steps
 * forward, paying `coins[i]` at each index you land on (and the start), and
 * can't land where `coins[i]` is -1. Returns the indices of the cheapest
 * path to the last index, the lexicographically smallest on a tie, or an
 * empty array if it can't be reached.
 *
 * DP from the end: the cheapest cost from each index, and the jump that
 * achieves it. Scanning jumps from the nearest and keeping only strictly
 * cheaper ones picks the smallest next index on a tie, which gives the
 * lexicographically smallest path.
 *
 * @see https://leetcode.com/problems/coin-path/
 * @difficulty Hard
 * @timeComplexity O(n · maxJump)
 * @spaceComplexity O(n)
 *
 * @example
 * coinPath([1, 2, 4, -1, 2], 2); // [1, 3, 5]
 */
export const coinPath = (
	coins: readonly number[],
	maxJump: number,
): number[] => {
	const n = coins.length;
	const cost = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
	const next = new Array<number>(n).fill(-1);
	if (coins[n - 1] !== -1) cost[n - 1] = coins[n - 1] ?? 0;

	for (let i = n - 2; i >= 0; i--) {
		if (coins[i] === -1) continue;
		for (let j = i + 1; j <= Math.min(i + maxJump, n - 1); j++) {
			const total = (coins[i] ?? 0) + (cost[j] ?? Number.POSITIVE_INFINITY);
			if (total < (cost[i] ?? Number.POSITIVE_INFINITY)) {
				cost[i] = total;
				next[i] = j;
			}
		}
	}

	if (cost[0] === Number.POSITIVE_INFINITY) return [];
	const path: number[] = [];
	for (let i = 0; i !== -1; i = next[i] ?? -1) path.push(i + 1);
	return path;
};
