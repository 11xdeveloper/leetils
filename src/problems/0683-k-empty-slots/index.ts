/**
 * 683. K Empty Slots
 *
 * Bulb `bulbs[i]` (1-indexed position) turns on on day `i + 1`. Returns the
 * first day on which two on bulbs have exactly `k` bulbs between them, all
 * off, or -1 if that never happens.
 *
 * Records the day each position turns on. Two positions `k + 1` apart
 * qualify on the later of their days if every position between turns on
 * later still. A window slides along: whenever a position inside turns on
 * sooner than both ends, no window containing it can work, so the window
 * restarts there.
 *
 * @see https://leetcode.com/problems/k-empty-slots/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * kEmptySlots([1, 3, 2], 1); // 2
 */
export const kEmptySlots = (bulbs: readonly number[], k: number): number => {
	const n = bulbs.length;
	const day = new Array<number>(n);
	for (const [i, position] of bulbs.entries()) day[position - 1] = i + 1;

	let best = Number.POSITIVE_INFINITY;
	for (let left = 0, right = k + 1, i = 1; right < n; i++) {
		const leftDay = day[left] ?? 0;
		const rightDay = day[right] ?? 0;
		if (i === right) {
			best = Math.min(best, Math.max(leftDay, rightDay));
		} else if ((day[i] ?? 0) > Math.max(leftDay, rightDay)) {
			continue;
		}
		left = i;
		right = i + k + 1;
	}

	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
