import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSumOfWeightsAfterEdgeRemovals as maximizeSumOfWeights } from ".";

/** Tries every subset of edges to keep. */
const byBruteForce = (edges: number[][], k: number): number => {
	const n = edges.length + 1;
	let best = 0;
	for (let mask = 0; mask < 1 << edges.length; mask++) {
		const degree = new Array<number>(n).fill(0);
		let sum = 0;
		edges.forEach(([u = 0, v = 0, w = 0], i) => {
			if (!((mask >> i) & 1)) return;
			degree[u] = (degree[u] ?? 0) + 1;
			degree[v] = (degree[v] ?? 0) + 1;
			sum += w;
		});
		if (degree.every((d) => d <= k)) best = Math.max(best, sum);
	}
	return best;
};

describe("3367. Maximize Sum of Weights after Edge Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximizeSumOfWeights(
				[
					[0, 1, 4],
					[0, 2, 2],
					[2, 3, 12],
					[2, 4, 6],
				],
				2,
			),
		).toBe(22);
		expect(
			maximizeSumOfWeights(
				[
					[0, 1, 5],
					[1, 2, 10],
					[0, 3, 15],
					[3, 4, 20],
					[3, 5, 5],
					[0, 6, 10],
				],
				3,
			),
		).toBe(65);
	});

	it("matches trying every subset on random trees", () => {
		const random = createRandom(3367);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 10);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
				random.int(1, 9),
			]);
			const k = random.int(1, 3);
			expect(maximizeSumOfWeights(edges, k)).toBe(byBruteForce(edges, k));
		}
	});
});
