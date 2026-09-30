/**
 * 1094. Car Pooling
 *
 * A car with `capacity` seats drives east, picking up `trip[0]` passengers
 * at `trip[1]` and dropping them at `trip[2]`. Returns whether every trip
 * fits.
 *
 * Records the change in passengers at each location (on at the start, off
 * at the end), then sweeps the locations in order checking the load.
 *
 * @see https://leetcode.com/problems/car-pooling/
 * @difficulty Medium
 * @timeComplexity O(n + L) for locations up to L
 * @spaceComplexity O(L)
 *
 * @example
 * carPooling([[2, 1, 5], [3, 3, 7]], 4); // false
 */
export const carPooling = (
	trips: readonly (readonly number[])[],
	capacity: number,
): boolean => {
	const last = Math.max(0, ...trips.map(([, , to = 0]) => to));
	const change = new Array<number>(last + 1).fill(0);
	for (const [passengers = 0, from = 0, to = 0] of trips) {
		change[from] = (change[from] ?? 0) + passengers;
		change[to] = (change[to] ?? 0) - passengers;
	}
	let load = 0;
	for (const delta of change) {
		load += delta;
		if (load > capacity) return false;
	}
	return true;
};
