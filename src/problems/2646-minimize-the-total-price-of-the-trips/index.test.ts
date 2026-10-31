import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeTheTotalPriceOfTheTrips as minimumTotalPrice } from ".";

/** Tries every set of non-adjacent nodes to halve. */
const byBruteForce = (
	n: number,
	edges: number[][],
	price: number[],
	trips: number[][],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const path = (from: number, to: number): number[] => {
		const parent = Array.from({ length: n }, () => -1);
		const stack = [from];
		const seen = new Set([from]);
		for (let node = stack.pop(); node !== undefined; node = stack.pop())
			for (const next of neighbours[node] ?? [])
				if (!seen.has(next)) {
					seen.add(next);
					parent[next] = node;
					stack.push(next);
				}
		const nodes = [to];
		while ((nodes.at(-1) ?? from) !== from)
			nodes.push(parent[nodes.at(-1) ?? 0] ?? from);
		return nodes;
	};
	const paths = trips.map(([a = 0, b = 0]) => path(a, b));
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << n; mask++) {
		if (edges.some(([a = 0, b = 0]) => (mask >> a) & 1 && (mask >> b) & 1))
			continue;
		const cost = paths
			.flat()
			.reduce(
				(sum, node) =>
					sum +
					((mask >> node) & 1 ? (price[node] ?? 0) / 2 : (price[node] ?? 0)),
				0,
			);
		best = Math.min(best, cost);
	}
	return best;
};

describe("2646. Minimize the Total Price of the Trips", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTotalPrice(
				4,
				[
					[0, 1],
					[1, 2],
					[1, 3],
				],
				[2, 2, 10, 6],
				[
					[0, 3],
					[2, 1],
					[2, 3],
				],
			),
		).toBe(23);
		expect(minimumTotalPrice(2, [[0, 1]], [2, 2], [[0, 0]])).toBe(1);
	});

	it("matches trying every set of halved nodes on random trees", () => {
		const random = createRandom(2646);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const price = Array.from({ length: n }, () => 2 * random.int(1, 10));
			const trips = Array.from({ length: random.int(1, 4) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(minimumTotalPrice(n, edges, price, trips)).toBe(
				byBruteForce(n, edges, price, trips),
			);
		}
	});
});
