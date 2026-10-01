/**
 * 1406. Stone Game III
 *
 * Alice and Bob alternately take 1, 2 or 3 stones from the front of the
 * row, scoring their values. Returns "Alice", "Bob" or "Tie" for the result
 * under best play.
 *
 * Dynamic programming from the back: `lead[i]` is the most the player to
 * move can finish ahead by, starting at stone `i`: take the next 1–3 stones
 * and subtract the opponent's best lead from there.
 *
 * @see https://leetcode.com/problems/stone-game-iii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGameIII([1, 2, 3, 7]); // "Bob"
 */
export const stoneGameIII = (stoneValue: readonly number[]): string => {
	const n = stoneValue.length;
	const lead = new Array<number>(n + 1).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		let [best, taken] = [-Infinity, 0];
		for (let k = 0; k < 3 && i + k < n; k++) {
			taken += stoneValue[i + k] ?? 0;
			best = Math.max(best, taken - (lead[i + k + 1] ?? 0));
		}
		lead[i] = best;
	}
	const result = lead[0] ?? 0;
	return result > 0 ? "Alice" : result < 0 ? "Bob" : "Tie";
};
