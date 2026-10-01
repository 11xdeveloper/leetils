/**
 * 815. Bus Routes
 *
 * Each bus loops forever through the stops in its route. Returns the
 * fewest buses to take to get from `source` to `target`, or -1 if you
 * can't.
 *
 * Breadth-first search where each level boards every unused bus serving
 * the stops reached so far, and reaches all of their stops at once.
 *
 * @see https://leetcode.com/problems/bus-routes/
 * @difficulty Hard
 * @timeComplexity O(total number of stops across routes)
 * @spaceComplexity O(total number of stops across routes)
 *
 * @example
 * busRoutes([[1, 2, 7], [3, 6, 7]], 1, 6); // 2
 */
export const busRoutes = (
	routes: readonly (readonly number[])[],
	source: number,
	target: number,
): number => {
	if (source === target) return 0;
	const busesAt = new Map<number, number[]>();
	for (const [bus, route] of routes.entries()) {
		for (const stop of route) {
			const buses = busesAt.get(stop);
			if (buses) buses.push(bus);
			else busesAt.set(stop, [bus]);
		}
	}

	const takenBus = new Uint8Array(routes.length);
	const seenStop = new Set([source]);
	let stops = [source];
	for (let buses = 1; stops.length > 0; buses++) {
		const next: number[] = [];
		for (const stop of stops) {
			for (const bus of busesAt.get(stop) ?? []) {
				if (takenBus[bus]) continue;
				takenBus[bus] = 1;
				for (const reached of routes[bus] ?? []) {
					if (reached === target) return buses;
					if (!seenStop.has(reached)) {
						seenStop.add(reached);
						next.push(reached);
					}
				}
			}
		}
		stops = next;
	}
	return -1;
};
