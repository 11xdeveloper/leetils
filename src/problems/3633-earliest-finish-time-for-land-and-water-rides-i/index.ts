/**
 * 3633. Earliest Finish Time for Land and Water Rides I
 *
 * Land ride i opens at `landStartTime[i]` and lasts `landDuration[i]`;
 * water rides likewise. Ride one of each, in either order, starting each
 * once it's open and you're free. Returns the earliest finish.
 *
 * Whichever kind goes first, finishing it sooner never hurts, so take the
 * earliest finish of that kind, then the best ride of the other kind.
 *
 * @see https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-i/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * earliestFinishTimeForLandAndWaterRidesI([2, 8], [4, 1], [6], [3]); // 9
 */
export const earliestFinishTimeForLandAndWaterRidesI = (
	landStartTime: readonly number[],
	landDuration: readonly number[],
	waterStartTime: readonly number[],
	waterDuration: readonly number[],
): number => {
	const then = (
		firstStart: readonly number[],
		firstDuration: readonly number[],
		secondStart: readonly number[],
		secondDuration: readonly number[],
	): number => {
		const free = Math.min(
			...firstStart.map((start, i) => start + (firstDuration[i] ?? 0)),
		);
		return Math.min(
			...secondStart.map(
				(start, i) => Math.max(free, start) + (secondDuration[i] ?? 0),
			),
		);
	};
	return Math.min(
		then(landStartTime, landDuration, waterStartTime, waterDuration),
		then(waterStartTime, waterDuration, landStartTime, landDuration),
	);
};
