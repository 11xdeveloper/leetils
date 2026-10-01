import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathWithMaximumProbability as maxProbability } from ".";

/** Bellman–Ford with products. */
const byBruteForce = (
	n: number,
	edges: number[][],
	probs: number[],
	start: number,
	end: number,
): number => {
	const best = new Array<number>(n).fill(0);
	best[start] = 1;
	for (let round = 0; round < n; round++) {
		edges.forEach(([a = 0, b = 0], i) => {
			const p = probs[i] ?? 0;
			best[b] = Math.max(best[b] ?? 0, (best[a] ?? 0) * p);
			best[a] = Math.max(best[a] ?? 0, (best[b] ?? 0) * p);
		});
	}
	return best[end] ?? 0;
};

describe("1514. Path with Maximum Probability", () => {
	const edges = [
		[0, 1],
		[1, 2],
		[0, 2],
	];

	it("solves the examples from the problem statement", () => {
		expect(maxProbability(3, edges, [0.5, 0.5, 0.2], 0, 2)).toBeCloseTo(0.25);
		expect(maxProbability(3, edges, [0.5, 0.5, 0.3], 0, 2)).toBeCloseTo(0.3);
		expect(maxProbability(3, [[0, 1]], [0.5], 0, 2)).toBe(0);
	});

	it("matches Bellman–Ford on random graphs", () => {
		const random = createRandom(1514);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const pairs = new Set<string>();
			for (let i = random.int(0, 10); i > 0; i--) {
				const [a, b] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (a !== b) pairs.add(`${Math.min(a, b)},${Math.max(a, b)}`);
			}
			const graph = [...pairs].map((pair) => pair.split(",").map(Number));
			const probs = graph.map(() => random.int(0, 10) / 10);
			const [start, end] = [0, n - 1];
			expect(maxProbability(n, graph, probs, start, end)).toBeCloseTo(
				byBruteForce(n, graph, probs, start, end),
				9,
			);
		}
	});
});
