import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { chooseEdgesToMaximizeScoreInATree as maxScore } from ".";

/** Tries every set of edges. */
const byBruteForce = (edges: number[][]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << edges.length; mask++) {
		if (mask & 1) continue;
		const used = new Set<number>();
		let [score, valid] = [0, true];
		for (const [node, [parent = 0, weight = 0]] of edges.entries()) {
			if (!(mask & (1 << node))) continue;
			if (used.has(node) || used.has(parent)) valid = false;
			used.add(node).add(parent);
			score += weight;
		}
		if (valid) best = Math.max(best, score);
	}
	return best;
};

describe("2378. Choose Edges to Maximize Score in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore([
				[-1, -1],
				[0, 5],
				[0, 10],
				[2, 6],
				[2, 4],
			]),
		).toBe(11);
		expect(
			maxScore([
				[-1, -1],
				[0, 5],
				[0, -6],
				[0, 7],
			]),
		).toBe(7);
	});

	it("matches trying every set of edges on random trees", () => {
		const random = createRandom(2378);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n }, (_, i) =>
				i === 0 ? [-1, -1] : [random.int(0, i - 1), random.int(-5, 10)],
			);
			expect(maxScore(edges)).toBe(byBruteForce(edges));
		}
	});
});
