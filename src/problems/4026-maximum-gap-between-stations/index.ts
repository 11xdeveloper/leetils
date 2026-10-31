/**
 * 4026. Maximum Gap Between Stations
 *
 * Assign workers in order to matching stations at increasing indices.
 * Returns the largest possible gap between two consecutive workers'
 * stations (0 for one worker).
 *
 * For the gap after worker i - 1, place workers up to i - 1 as early as
 * possible and the rest as late as possible: greedy matches from each end.
 *
 * @see https://leetcode.com/problems/maximum-gap-between-stations/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumGapBetweenStations("cbc", "cbcdbc"); // 4
 */
export const maximumGapBetweenStations = (
	skill: string,
	station: string,
): number => {
	const n = skill.length;
	const earliest = new Int32Array(n);
	for (let i = 0, j = 0; i < n; i++, j++) {
		while (station[j] !== skill[i]) j++;
		earliest[i] = j;
	}
	const latest = new Int32Array(n);
	for (let i = n - 1, j = station.length - 1; i >= 0; i--, j--) {
		while (station[j] !== skill[i]) j--;
		latest[i] = j;
	}
	let best = 0;
	for (let i = 1; i < n; i++)
		best = Math.max(best, (latest[i] ?? 0) - (earliest[i - 1] ?? 0));
	return best;
};
