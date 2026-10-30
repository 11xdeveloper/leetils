/**
 * 2498. Frog Jump II
 *
 * A frog jumps from the first stone to the last and back, landing on each
 * stone at most once. Returns the smallest possible longest jump.
 *
 * Alternating stones on the way out and back is optimal, so the answer is
 * the largest gap between stones two apart (or the only gap).
 *
 * @see https://leetcode.com/problems/frog-jump-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * frogJumpII([0, 2, 5, 6, 7]); // 5
 */
export const frogJumpII = (stones: readonly number[]): number => {
	let best = (stones[1] ?? 0) - (stones[0] ?? 0);
	for (let i = 2; i < stones.length; i++)
		best = Math.max(best, (stones[i] ?? 0) - (stones[i - 2] ?? 0));
	return best;
};
