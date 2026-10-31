/**
 * 2332. The Latest Time to Catch a Bus
 *
 * Buses leave at `buses[i]` taking up to `capacity` waiting passengers,
 * earliest arrivals first. Returns the latest time you can arrive (not at
 * the same time as another passenger) and still catch a bus.
 *
 * Simulate boarding. Then on the last bus, arrive just before the last
 * passenger to board, or at departure if it had a spare seat, stepping
 * back past any taken times.
 *
 * @see https://leetcode.com/problems/the-latest-time-to-catch-a-bus/
 * @difficulty Medium
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * theLatestTimeToCatchABus([10, 20], [2, 17, 18, 19], 2); // 16
 */
export const theLatestTimeToCatchABus = (
	buses: readonly number[],
	passengers: readonly number[],
	capacity: number,
): number => {
	const sortedBuses = buses.toSorted((a, b) => a - b);
	const sorted = passengers.toSorted((a, b) => a - b);
	let [next, seats] = [0, 0];
	for (const departure of sortedBuses) {
		seats = capacity;
		while (
			seats > 0 &&
			next < sorted.length &&
			(sorted[next] ?? 0) <= departure
		) {
			next++;
			seats--;
		}
	}
	let time = seats > 0 ? (sortedBuses.at(-1) ?? 0) : (sorted[next - 1] ?? 0);
	for (let i = next - 1; i >= 0 && sorted[i] === time; i--) time--;
	return time;
};
