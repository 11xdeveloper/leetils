import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfPossibleRootNodes as rootCount } from ".";

/** Roots the tree at every node and checks each guess. */
const byBruteForce = (
	edges: number[][],
	guesses: number[][],
	k: number,
): number => {
	const n = edges.length + 1;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	let roots = 0;
	for (let root = 0; root < n; root++) {
		const parent = Array.from({ length: n }, () => -1);
		const stack = [root];
		const seen = new Set([root]);
		for (let node = stack.pop(); node !== undefined; node = stack.pop())
			for (const next of neighbours[node] ?? [])
				if (!seen.has(next)) {
					seen.add(next);
					parent[next] = node;
					stack.push(next);
				}
		if (guesses.filter(([u, v = 0]) => parent[v] === u).length >= k) roots++;
	}
	return roots;
};

describe("2581. Count Number of Possible Root Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rootCount(
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[4, 2],
				],
				[
					[1, 3],
					[0, 1],
					[1, 0],
					[2, 4],
				],
				3,
			),
		).toBe(3);
		expect(
			rootCount(
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[3, 4],
				],
				[
					[1, 0],
					[3, 4],
					[2, 1],
					[3, 2],
				],
				1,
			),
		).toBe(5);
	});

	it("matches rooting at every node on random trees", () => {
		const random = createRandom(2581);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const guesses = edges
				.filter(() => random.int(0, 1))
				.map(([a = 0, b = 0]) => (random.int(0, 1) ? [a, b] : [b, a]));
			const k = random.int(0, guesses.length);
			expect(rootCount(edges, guesses, k)).toBe(
				byBruteForce(edges, guesses, k),
			);
		}
	});
});
