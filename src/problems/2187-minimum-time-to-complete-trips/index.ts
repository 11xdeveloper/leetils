/**
 * 2187. Minimum Time to Complete Trips
 *
 * Bus `i` completes a trip every `time[i]` units, independently. Returns
 * the least time for all buses together to complete `totalTrips` trips.
 *
 * Binary search the time; count trips, stopping once there are enough.
 *
 * @see https://leetcode.com/problems/minimum-time-to-complete-trips/
 * @difficulty Medium
 * @timeComplexity O(n log(min time · totalTrips))
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToCompleteTrips([1, 2, 3], 5); // 3
 */
export const minimumTimeToCompleteTrips = (
	time: readonly number[],
	totalTrips: number,
): number => {
	const enough = (t: number): boolean => {
		let trips = 0;
		for (const each of time) {
			trips += Math.floor(t / each);
			if (trips >= totalTrips) return true;
		}
		return false;
	};
	let [lo, hi] = [1, Math.min(...time) * totalTrips];
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (enough(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
