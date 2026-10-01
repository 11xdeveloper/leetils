/**
 * 1419. Minimum Number of Frogs Croaking
 *
 * `croakOfFrogs` interleaves several frogs each saying "croak" letter by
 * letter. Returns the fewest frogs that could have produced it, or -1 if
 * it isn't a valid mix of complete croaks.
 *
 * Tracks how many frogs are part-way through each letter. Each letter moves
 * one frog from the previous stage (a `c` may start a new frog); a `k`
 * finishes one. The answer is the most frogs croaking at once.
 *
 * @see https://leetcode.com/problems/minimum-number-of-frogs-croaking/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfFrogsCroaking("crcoakroak"); // 2
 */
export const minimumNumberOfFrogsCroaking = (croakOfFrogs: string): number => {
	// waiting[i] counts frogs that have just said "croak"[i].
	const waiting = [0, 0, 0, 0];
	let [active, most] = [0, 0];
	for (const char of croakOfFrogs) {
		const stage = "croak".indexOf(char);
		if (stage === 0) {
			active++;
			most = Math.max(most, active);
		} else {
			if ((waiting[stage - 1] ?? 0) === 0) return -1;
			waiting[stage - 1] = (waiting[stage - 1] ?? 0) - 1;
		}
		if (stage === 4) active--;
		else waiting[stage] = (waiting[stage] ?? 0) + 1;
	}
	return active === 0 ? most : -1;
};
