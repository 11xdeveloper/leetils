import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { allPathsFromSourceLeadToDestination as leadsToDestination } from ".";

/** Checks reachable dead ends, and reachable cycles via a reachability matrix. */
const byReachability = (
	n: number,
	edges: number[][],
	source: number,
	destination: number,
): boolean => {
	const reach = Array.from({ length: n }, () =>
		new Array<boolean>(n).fill(false),
	);
	for (const [a = 0, b = 0] of edges) (reach[a] ?? [])[b] = true;
	for (let k = 0; k < n; k++)
		for (let i = 0; i < n; i++)
			for (let j = 0; j < n; j++)
				if (reach[i]?.[k] && reach[k]?.[j]) (reach[i] ?? [])[j] = true;
	const reachable = Array.from({ length: n }, (_, v) => v).filter(
		(v) => v === source || reach[source]?.[v],
	);
	return reachable.every(
		(v) =>
			!reach[v]?.[v] && (edges.some(([a]) => a === v) || v === destination),
	);
};

describe("1059. All Paths from Source Lead to Destination", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			leadsToDestination(
				3,
				[
					[0, 1],
					[0, 2],
				],
				0,
				2,
			),
		).toBeFalse();
		expect(
			leadsToDestination(
				4,
				[
					[0, 1],
					[0, 3],
					[1, 2],
					[2, 1],
				],
				0,
				3,
			),
		).toBeFalse();
		expect(
			leadsToDestination(
				4,
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[2, 3],
				],
				0,
				3,
			),
		).toBeTrue();
	});

	it("matches checking reachable cycles and dead ends on random graphs", () => {
		const random = createRandom(1059);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 6);
			const edges = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			const [source, destination] = [
				random.int(0, n - 1),
				random.int(0, n - 1),
			];
			expect(leadsToDestination(n, edges, source, destination)).toBe(
				byReachability(n, edges, source, destination),
			);
		}
	});
});
