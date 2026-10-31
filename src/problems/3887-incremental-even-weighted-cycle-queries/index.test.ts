import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { incrementalEvenWeightedCycleQueries as numberOfEdgesAdded } from ".";

/** Re-labels the graph by search after each edge. */
const byBruteForce = (n: number, edges: number[][]): number => {
	const kept: number[][] = [];
	for (const edge of edges) {
		const trial = [...kept, edge];
		const labels = new Array<number>(n).fill(-1);
		let ok = true;
		for (let s = 0; s < n && ok; s++) {
			if (labels[s] !== -1) continue;
			labels[s] = 0;
			const stack = [s];
			while (stack.length > 0 && ok) {
				const x = stack.pop() ?? 0;
				for (const [a = 0, b = 0, w = 0] of trial) {
					if (a !== x && b !== x) continue;
					const y = a === x ? b : a;
					const want = (labels[x] ?? 0) ^ w;
					if (labels[y] === -1) {
						labels[y] = want;
						stack.push(y);
					} else if (labels[y] !== want) ok = false;
				}
			}
		}
		if (ok) kept.push(edge);
	}
	return kept.length;
};

describe("3887. Incremental Even-Weighted Cycle Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfEdgesAdded(3, [
				[0, 1, 1],
				[1, 2, 1],
				[0, 2, 1],
			]),
		).toBe(2);
		expect(
			numberOfEdgesAdded(3, [
				[0, 1, 1],
				[1, 2, 1],
				[0, 2, 0],
			]),
		).toBe(3);
	});

	it("matches re-labelling on random graphs", () => {
		const random = createRandom(3887);
		for (let run = 0; run < 200; run++) {
			const n = random.int(3, 7);
			const pairs: number[][] = [];
			for (let u = 0; u < n; u++)
				for (let v = u + 1; v < n; v++)
					if (random.int(0, 1)) pairs.push([u, v, random.int(0, 1)]);
			expect(numberOfEdgesAdded(n, pairs)).toBe(byBruteForce(n, pairs));
		}
	});
});
