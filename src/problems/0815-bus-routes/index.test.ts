import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { busRoutes as numBusesToDestination } from ".";

/** Breadth-first search over buses, where two buses connect if they share a stop. */
const byBusGraph = (
	routes: number[][],
	source: number,
	target: number,
): number => {
	if (source === target) return 0;
	const start = routes.flatMap((route, bus) =>
		route.includes(source) ? [bus] : [],
	);
	const seen = new Set(start);
	let frontier = start;
	for (let buses = 1; frontier.length > 0; buses++) {
		if (frontier.some((bus) => routes[bus]?.includes(target))) return buses;
		const next: number[] = [];
		for (const bus of frontier) {
			for (const [other, route] of routes.entries()) {
				if (
					!seen.has(other) &&
					route.some((stop) => routes[bus]?.includes(stop))
				) {
					seen.add(other);
					next.push(other);
				}
			}
		}
		frontier = next;
	}
	return -1;
};

describe("815. Bus Routes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numBusesToDestination(
				[
					[1, 2, 7],
					[3, 6, 7],
				],
				1,
				6,
			),
		).toBe(2);
		expect(
			numBusesToDestination(
				[[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]],
				15,
				12,
			),
		).toBe(-1);
	});

	it("needs no buses to stay put", () => {
		expect(numBusesToDestination([[1, 2]], 5, 5)).toBe(0);
	});

	it("matches searching the graph of buses on random routes", () => {
		const random = createRandom(815);
		for (let run = 0; run < 500; run++) {
			const routes = Array.from({ length: random.int(1, 6) }, () => [
				...new Set(random.array(random.int(1, 4), 0, 10)),
			]);
			const source = random.int(0, 10);
			const target = random.int(0, 10);
			expect(numBusesToDestination(routes, source, target)).toBe(
				byBusGraph(routes, source, target),
			);
		}
	});
});
