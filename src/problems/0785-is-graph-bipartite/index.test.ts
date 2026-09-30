import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { isGraphBipartite as isBipartite } from ".";

/** Tries every split of the nodes into two sets. */
const byBruteForce = (graph: number[][]): boolean => {
	for (let mask = 0; mask < 1 << graph.length; mask++) {
		if (
			graph.every((neighbours, u) =>
				neighbours.every((v) => ((mask >> u) & 1) !== ((mask >> v) & 1)),
			)
		)
			return true;
	}
	return false;
};

describe("785. Is Graph Bipartite?", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isBipartite([
				[1, 2, 3],
				[0, 2],
				[0, 1, 3],
				[0, 2],
			]),
		).toBeFalse();
		expect(
			isBipartite([
				[1, 3],
				[0, 2],
				[1, 3],
				[0, 2],
			]),
		).toBeTrue();
	});

	it("matches trying every split on random graphs", () => {
		const random = createRandom(785);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 9);
			const graph: number[][] = Array.from({ length: n }, () => []);
			for (let edges = random.int(0, n); edges > 0; edges--) {
				const [u, v] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (u === v || graph[u]?.includes(v)) continue;
				graph[u]?.push(v);
				graph[v]?.push(u);
			}
			expect(isBipartite(graph)).toBe(byBruteForce(graph));
		}
	});
});
