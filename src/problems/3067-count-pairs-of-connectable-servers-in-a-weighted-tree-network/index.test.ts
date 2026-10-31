import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsOfConnectableServersInAWeightedTreeNetwork as countPairsOfConnectableServers } from ".";

/** Checks every triple with all-pairs distances and paths. */
const byBruteForce = (edges: number[][], signalSpeed: number): number[] => {
	const n = edges.length + 1;
	const distance = Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j) =>
			i === j ? 0 : Number.POSITIVE_INFINITY,
		),
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		const [du, dv] = [distance[u], distance[v]];
		if (du) du[v] = w;
		if (dv) dv[u] = w;
	}
	for (let k = 0; k < n; k++)
		for (let i = 0; i < n; i++)
			for (let j = 0; j < n; j++) {
				const through = (distance[i]?.[k] ?? 0) + (distance[k]?.[j] ?? 0);
				const row = distance[i];
				if (row && through < (row[j] ?? 0)) row[j] = through;
			}
	const d = (i: number, j: number) => distance[i]?.[j] ?? 0;
	return Array.from({ length: n }, (_, c) => {
		let pairs = 0;
		for (let a = 0; a < n; a++)
			for (let b = a + 1; b < n; b++)
				if (
					a !== c &&
					b !== c &&
					d(a, c) % signalSpeed === 0 &&
					d(b, c) % signalSpeed === 0 &&
					d(a, c) + d(c, b) === d(a, b)
				)
					pairs++;
		return pairs;
	});
};

describe("3067. Count Pairs of Connectable Servers in a Weighted Tree Network", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPairsOfConnectableServers(
				[
					[0, 1, 1],
					[1, 2, 5],
					[2, 3, 13],
					[3, 4, 9],
					[4, 5, 2],
				],
				1,
			),
		).toEqual([0, 4, 6, 6, 4, 0]);
		expect(
			countPairsOfConnectableServers(
				[
					[0, 6, 3],
					[6, 5, 3],
					[0, 3, 1],
					[3, 2, 7],
					[3, 1, 6],
					[3, 4, 2],
				],
				3,
			),
		).toEqual([2, 0, 0, 0, 0, 0, 2]);
	});

	it("matches checking every triple on random trees", () => {
		const random = createRandom(3067);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
				random.int(1, 6),
			]);
			const speed = random.int(1, 4);
			expect(countPairsOfConnectableServers(edges, speed)).toEqual(
				byBruteForce(edges, speed),
			);
		}
	});
});
