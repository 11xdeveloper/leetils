import { Heap } from "../../internal/heap";

/**
 * 871. Minimum Number of Refueling Stops
 *
 * A car starts with `startFuel` litres, using one per mile, and passes gas
 * stations `[position, fuel]` in order along the way to `target`. Returns
 * the fewest stops needed to reach the target, or -1 if it can't.
 *
 * Greedy with hindsight: drive as far as the fuel allows, remembering the
 * stations passed. Whenever the next station or the target is out of
 * reach, "go back in time" and refuel at the largest station passed, from a
 * max-heap.
 *
 * @see https://leetcode.com/problems/minimum-number-of-refueling-stops/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfRefuelingStops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]); // 2
 */
export const minimumNumberOfRefuelingStops = (
	target: number,
	startFuel: number,
	stations: readonly (readonly number[])[],
): number => {
	const passed = new Heap<number>((a, b) => b - a);
	let reach = startFuel;
	let stops = 0;
	for (const [position, fuel = 0] of [...stations, [target, 0]]) {
		while (reach < (position ?? 0)) {
			const best = passed.pop();
			if (best === undefined) return -1;
			reach += best;
			stops++;
		}
		passed.push(fuel);
	}
	return stops;
};
