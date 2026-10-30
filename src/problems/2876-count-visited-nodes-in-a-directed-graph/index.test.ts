import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countVisitedNodesInADirectedGraph as countVisitedNodes } from ".";

const byBruteForce = (edges: number[]): number[] =>
	edges.map((_, start) => {
		const seen = new Set<number>();
		for (let node = start; !seen.has(node); node = edges[node] ?? 0)
			seen.add(node);
		return seen.size;
	});

describe("2876. Count Visited Nodes in a Directed Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(countVisitedNodes([1, 2, 0, 0])).toEqual([3, 3, 3, 4]);
		expect(countVisitedNodes([1, 2, 3, 4, 0])).toEqual([5, 5, 5, 5, 5]);
	});

	it("matches walking from each node on random graphs", () => {
		const random = createRandom(2876);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 10);
			const edges = Array.from(
				{ length: n },
				(_, i) => (i + random.int(1, n - 1)) % n,
			);
			expect(countVisitedNodes(edges)).toEqual(byBruteForce(edges));
		}
	});
});
