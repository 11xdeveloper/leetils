/**
 * 1184. Distance Between Bus Stops
 *
 * Bus stops form a circle, with `distance[i]` between stop `i` and the next.
 * Returns the shorter way round from `start` to `destination`.
 *
 * Sums the stretch between the two stops going one way; the other way is
 * the rest of the circle.
 *
 * @see https://leetcode.com/problems/distance-between-bus-stops/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * distanceBetweenBusStops([1, 2, 3, 4], 0, 3); // 4
 */
export const distanceBetweenBusStops = (
	distance: readonly number[],
	start: number,
	destination: number,
): number => {
	const [from, to] = [
		Math.min(start, destination),
		Math.max(start, destination),
	];
	let [between, total] = [0, 0];
	distance.forEach((d, i) => {
		total += d;
		if (i >= from && i < to) between += d;
	});
	return Math.min(between, total - between);
};
