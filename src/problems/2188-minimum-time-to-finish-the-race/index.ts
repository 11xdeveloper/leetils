/**
 * 2188. Minimum Time to Finish the Race
 *
 * Tire `[f, r]` takes `f · r^(x - 1)` seconds for its `x`-th consecutive
 * lap. Changing to a fresh tire (any type, unlimited) costs `changeTime`.
 * Returns the least time to finish `numLaps` laps.
 *
 * A tire is never worth keeping once a lap costs more than changing plus
 * a fresh first lap, so stints are short (under 20 laps). Find the best
 * time for each stint length, then split the race into stints.
 *
 * @see https://leetcode.com/problems/minimum-time-to-finish-the-race/
 * @difficulty Hard
 * @timeComplexity O(t · L + numLaps · L) for stints up to L laps
 * @spaceComplexity O(numLaps + L)
 *
 * @example
 * minimumTimeToFinishTheRace([[2, 3], [3, 4]], 5, 4); // 21
 */
export const minimumTimeToFinishTheRace = (
	tires: readonly (readonly number[])[],
	changeTime: number,
	numLaps: number,
): number => {
	const stint: number[] = [0];
	for (const [f = 0, r = 0] of tires) {
		let [lap, total] = [f, 0];
		for (let laps = 1; laps <= numLaps && lap <= changeTime + f; laps++) {
			total += lap;
			stint[laps] = Math.min(stint[laps] ?? Infinity, total);
			lap *= r;
		}
	}
	const best = new Array<number>(numLaps + 1).fill(Infinity);
	best[0] = -changeTime;
	for (let laps = 1; laps <= numLaps; laps++) {
		for (let last = 1; last < stint.length && last <= laps; last++) {
			best[laps] = Math.min(
				best[laps] ?? Infinity,
				(best[laps - last] ?? Infinity) +
					changeTime +
					(stint[last] ?? Infinity),
			);
		}
	}
	return best[numLaps] ?? 0;
};
