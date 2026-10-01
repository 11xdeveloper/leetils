/**
 * 1560. Most Visited Sector in  a Circular Track
 *
 * A marathon on a circular track of sectors `1 … n` runs from `rounds[0]`
 * through each later entry in turn. Returns the most visited sectors, in
 * ascending order.
 *
 * Every full lap visits each sector equally, so only the stretch from the
 * starting sector to the finishing sector (going forwards) gets an extra
 * visit.
 *
 * @see https://leetcode.com/problems/most-visited-sector-in-a-circular-track/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * mostVisitedSectorInACircularTrack(4, [1, 3, 1, 2]); // [1, 2]
 */
export const mostVisitedSectorInACircularTrack = (
	n: number,
	rounds: readonly number[],
): number[] => {
	const [start = 1, end = 1] = [rounds[0], rounds.at(-1)];
	const sectors = Array.from({ length: n }, (_, i) => i + 1);
	return start <= end
		? sectors.filter((s) => s >= start && s <= end)
		: sectors.filter((s) => s <= end || s >= start);
};
