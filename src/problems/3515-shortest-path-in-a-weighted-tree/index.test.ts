import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPathInAWeightedTree as treeQueries } from ".";

/** Walks up to the root for every distance query. */
const byBruteForce = (
	n: number,
	edges: number[][],
	queries: number[][],
): number[] => {
	const weights = new Map(
		edges.map(([u = 0, v = 0, w = 0]) => [
			`${Math.min(u, v)},${Math.max(u, v)}`,
			w,
		]),
	);
	const parent = new Array<number>(n + 1).fill(0);
	const adjacent: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const order = [1];
	const seen = new Set([1]);
	for (let i = 0; i < order.length; i++)
		for (const next of adjacent[order[i] ?? 0] ?? [])
			if (!seen.has(next)) {
				seen.add(next);
				parent[next] = order[i] ?? 0;
				order.push(next);
			}
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0, w = 0] of queries)
		if (type === 1) weights.set(`${Math.min(a, b)},${Math.max(a, b)}`, w);
		else {
			let sum = 0;
			for (let at = a; at !== 1; at = parent[at] ?? 1) {
				const up = parent[at] ?? 1;
				sum += weights.get(`${Math.min(at, up)},${Math.max(at, up)}`) ?? 0;
			}
			answers.push(sum);
		}
	return answers;
};

describe("3515. Shortest Path in a Weighted Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeQueries(
				2,
				[[1, 2, 7]],
				[
					[2, 2],
					[1, 1, 2, 4],
					[2, 2],
				],
			),
		).toEqual([7, 4]);
		expect(
			treeQueries(
				3,
				[
					[1, 2, 2],
					[1, 3, 4],
				],
				[
					[2, 1],
					[2, 3],
					[1, 1, 3, 7],
					[2, 2],
					[2, 3],
				],
			),
		).toEqual([0, 4, 2, 7]);
	});

	it("matches walking up on random trees", () => {
		const random = createRandom(3515);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
				random.int(1, 9),
			]);
			const queries = Array.from({ length: random.int(1, 8) }, () => {
				if (edges.length > 0 && random.int(0, 1) === 0) {
					const [u = 0, v = 0] = edges[random.int(0, edges.length - 1)] ?? [];
					return random.int(0, 1)
						? [1, u, v, random.int(1, 9)]
						: [1, v, u, random.int(1, 9)];
				}
				return [2, random.int(1, n)];
			});
			expect(treeQueries(n, edges, queries)).toEqual(
				byBruteForce(n, edges, queries),
			);
		}
	});
});
