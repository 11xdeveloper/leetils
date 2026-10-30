import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumEdgeWeightEquilibriumQueriesInATree as minOperationsQueries } from ".";

/** Walks each path explicitly. */
const byBruteForce = (
	n: number,
	edges: number[][],
	queries: number[][],
): number[] => {
	const neighbours: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0, w = 1] of edges) {
		neighbours[a]?.push([b, w]);
		neighbours[b]?.push([a, w]);
	}
	return queries.map(([from = 0, to = 0]) => {
		const via = new Map<number, [number, number]>([[from, [-1, 0]]]);
		const stack = [from];
		for (let node = stack.pop(); node !== undefined; node = stack.pop())
			for (const [next, w] of neighbours[node] ?? [])
				if (!via.has(next)) {
					via.set(next, [node, w]);
					stack.push(next);
				}
		const weights: number[] = [];
		for (let node = to; node !== from; node = via.get(node)?.[0] ?? from)
			weights.push(via.get(node)?.[1] ?? 0);
		const counts = new Map<number, number>();
		for (const w of weights) counts.set(w, (counts.get(w) ?? 0) + 1);
		return weights.length - Math.max(0, ...counts.values());
	});
};

describe("2846. Minimum Edge Weight Equilibrium Queries in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minOperationsQueries(
				7,
				[
					[0, 1, 1],
					[1, 2, 1],
					[2, 3, 1],
					[3, 4, 2],
					[4, 5, 2],
					[5, 6, 2],
				],
				[
					[0, 3],
					[3, 6],
					[2, 6],
					[0, 6],
				],
			),
		).toEqual([0, 0, 1, 3]);
		expect(
			minOperationsQueries(
				8,
				[
					[1, 2, 6],
					[1, 3, 4],
					[2, 4, 6],
					[2, 5, 3],
					[3, 6, 6],
					[3, 0, 8],
					[7, 0, 2],
				],
				[
					[4, 6],
					[0, 4],
					[6, 5],
					[7, 4],
				],
			),
		).toEqual([1, 2, 2, 3]);
	});

	it("matches walking each path on random trees", () => {
		const random = createRandom(2846);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
				random.int(1, 4),
			]);
			const queries = Array.from({ length: 5 }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(minOperationsQueries(n, edges, queries)).toEqual(
				byBruteForce(n, edges, queries),
			);
		}
	});
});
