/**
 * 403. Frog Jump
 *
 * A frog crosses a river on stones at the given sorted positions, starting
 * on the first stone with a first jump of exactly 1. If its last jump was
 * `k` units, the next must be `k - 1`, `k` or `k + 1`, and it can only land
 * on stones. Returns whether it can reach the last stone.
 *
 * Records, for each stone, the jump lengths that can arrive there. Each
 * arriving jump `k` offers `k - 1`, `k` and `k + 1` onward to whichever
 * stones they reach.
 *
 * @see https://leetcode.com/problems/frog-jump/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * frogJump([0, 1, 3, 5, 6, 8, 12, 17]); // true
 */
export const frogJump = (stones: readonly number[]): boolean => {
	const arrivals = new Map(stones.map((stone) => [stone, new Set<number>()]));
	arrivals.get(0)?.add(0);

	for (const stone of stones) {
		for (const jump of arrivals.get(stone) ?? []) {
			for (const next of [jump - 1, jump, jump + 1]) {
				if (next > 0) arrivals.get(stone + next)?.add(next);
			}
		}
	}

	return (
		(arrivals.get(stones.at(-1) ?? 0)?.size ?? 0) > 0 || stones.length === 1
	);
};
