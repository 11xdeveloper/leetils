/**
 * 1870. Minimum Speed to Arrive on Time
 *
 * Trains run the distances in `dist` one after another, each departing on
 * a whole hour. Returns the smallest integer speed (at most 10^7) that
 * arrives within `hour`, or -1.
 *
 * Binary search the speed: every leg but the last takes a whole number of
 * hours, rounded up.
 *
 * @see https://leetcode.com/problems/minimum-speed-to-arrive-on-time/
 * @difficulty Medium
 * @timeComplexity O(n log 10^7)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSpeedToArriveOnTime([1, 3, 2], 2.7); // 3
 */
export const minimumSpeedToArriveOnTime = (
	dist: readonly number[],
	hour: number,
): number => {
	const MAX_SPEED = 10_000_000;
	const onTime = (speed: number) => {
		let time = 0;
		for (let i = 0; i < dist.length - 1; i++)
			time += Math.ceil((dist[i] ?? 0) / speed);
		// `hour` has at most two decimals, so allow for floating-point error.
		return time + (dist.at(-1) ?? 0) / speed <= hour + 1e-9;
	};
	if (!onTime(MAX_SPEED)) return -1;
	let [low, high] = [1, MAX_SPEED];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (onTime(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};
