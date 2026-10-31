/**
 * 2555. Maximize Win From Two Segments
 *
 * Prizes lie at the sorted positions given. Choosing two segments of
 * length `k` wins every prize inside either one. Returns the most prizes
 * you can win.
 *
 * Slide a window of length `k`; for each window ending at `i`, pair it
 * with the best window ending before it starts.
 *
 * @see https://leetcode.com/problems/maximize-win-from-two-segments/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeWinFromTwoSegments([1, 1, 2, 2, 3, 3, 5], 2); // 7
 */
export const maximizeWinFromTwoSegments = (
	prizePositions: readonly number[],
	k: number,
): number => {
	// bestBefore[i]: the most prizes one window can take among the first i.
	const bestBefore = [0];
	let best = 0;
	let left = 0;
	for (let right = 0; right < prizePositions.length; right++) {
		while ((prizePositions[right] ?? 0) - (prizePositions[left] ?? 0) > k)
			left++;
		const window = right - left + 1;
		best = Math.max(best, window + (bestBefore[left] ?? 0));
		bestBefore.push(Math.max(bestBefore[right] ?? 0, window));
	}
	return best;
};
