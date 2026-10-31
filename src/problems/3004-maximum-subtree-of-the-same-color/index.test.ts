import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubtreeOfTheSameColor } from ".";

/** Collects each subtree's colors by recursion. */
const byBruteForce = (edges: number[][], colors: number[]): number => {
	const adjacent: number[][] = colors.map(() => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	let best = 0;
	const collect = (node: number, parent: number): number[] => {
		const all = [colors[node] ?? 0];
		for (const next of adjacent[node] ?? [])
			if (next !== parent) all.push(...collect(next, node));
		if (new Set(all).size === 1) best = Math.max(best, all.length);
		return all;
	};
	collect(0, -1);
	return best;
};

describe("3004. Maximum Subtree of the Same Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSubtreeOfTheSameColor(
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				[1, 1, 2, 3],
			),
		).toBe(1);
		expect(
			maximumSubtreeOfTheSameColor(
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				[1, 1, 1, 1],
			),
		).toBe(4);
		expect(
			maximumSubtreeOfTheSameColor(
				[
					[0, 1],
					[0, 2],
					[2, 3],
					[2, 4],
				],
				[1, 2, 3, 3, 3],
			),
		).toBe(3);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(3004);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const colors = random.array(n, 1, 2);
			expect(maximumSubtreeOfTheSameColor(edges, colors)).toBe(
				byBruteForce(edges, colors),
			);
		}
	});
});
