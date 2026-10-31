import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubgraphScoreInATree as maxSubgraphScore } from ".";

/** Tries every connected set. */
const byBruteForce = (
	n: number,
	edges: number[][],
	good: number[],
): number[] => {
	const best = new Array<number>(n).fill(Number.NEGATIVE_INFINITY);
	for (let mask = 1; mask < 1 << n; mask++) {
		const nodes = Array.from({ length: n }, (_, i) => i).filter(
			(i) => (mask >> i) & 1,
		);
		const seen = new Set([nodes[0]]);
		for (let changed = true; changed; ) {
			changed = false;
			for (const [u = 0, v = 0] of edges)
				if ((mask >> u) & 1 && (mask >> v) & 1 && seen.has(u) !== seen.has(v)) {
					seen.add(u);
					seen.add(v);
					changed = true;
				}
		}
		if (seen.size !== nodes.length) continue;
		const score = nodes.reduce((s, i) => s + (good[i] ? 1 : -1), 0);
		for (const i of nodes) best[i] = Math.max(best[i] ?? 0, score);
	}
	return best;
};

describe("3772. Maximum Subgraph Score in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSubgraphScore(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[1, 0, 1],
			),
		).toEqual([1, 1, 1]);
		expect(
			maxSubgraphScore(
				5,
				[
					[1, 0],
					[1, 2],
					[1, 3],
					[3, 4],
				],
				[0, 1, 0, 1, 1],
			),
		).toEqual([2, 3, 2, 3, 3]);
		expect(maxSubgraphScore(2, [[0, 1]], [0, 0])).toEqual([-1, -1]);
	});

	it("matches trying every connected set on random trees", () => {
		const random = createRandom(3772);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const good = random.array(n, 0, 1);
			expect(maxSubgraphScore(n, edges, good)).toEqual(
				byBruteForce(n, edges, good),
			);
		}
	});
});
