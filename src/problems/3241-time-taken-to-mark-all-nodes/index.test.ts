import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { timeTakenToMarkAllNodes as timeTaken } from ".";

/** Dijkstra-free longest path search from every node (it's a tree). */
const byBruteForce = (edges: number[][]): number[] => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const farthest = (node: number, from: number): number => {
		let best = 0;
		for (const next of adjacent[node] ?? [])
			if (next !== from)
				best = Math.max(best, (next % 2 === 0 ? 2 : 1) + farthest(next, node));
		return best;
	};
	return Array.from({ length: n }, (_, i) => farthest(i, -1));
};

describe("3241. Time Taken to Mark All Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			timeTaken([
				[0, 1],
				[0, 2],
			]),
		).toEqual([2, 4, 3]);
		expect(timeTaken([[0, 1]])).toEqual([1, 2]);
		expect(
			timeTaken([
				[2, 4],
				[0, 1],
				[2, 3],
				[0, 2],
			]),
		).toEqual([4, 6, 3, 5, 5]);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(3241);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			expect(timeTaken(edges)).toEqual(byBruteForce(edges));
		}
	});
});
