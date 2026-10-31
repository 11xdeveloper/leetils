import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeForKConnectedComponents as minTime } from ".";

/** Tries every time and counts components. */
const byBruteForce = (n: number, edges: number[][], k: number): number => {
	for (const t of [0, ...edges.map((e) => e[2] ?? 0)].sort((a, b) => a - b)) {
		const parent = Array.from({ length: n }, (_, i) => i);
		const find = (x: number): number =>
			parent[x] === x ? x : find(parent[x] ?? x);
		for (const [u = 0, v = 0, time = 0] of edges)
			if (time > t) parent[find(u)] = find(v);
		if (new Set(parent.map((_, i) => find(i))).size >= k) return t;
	}
	return -1;
};

describe("3608. Minimum Time for K Connected Components", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTime(2, [[0, 1, 3]], 2)).toBe(3);
		expect(
			minTime(
				3,
				[
					[0, 1, 2],
					[1, 2, 4],
				],
				3,
			),
		).toBe(4);
		expect(minTime(3, [[0, 2, 5]], 2)).toBe(0);
	});

	it("matches trying every time on random graphs", () => {
		const random = createRandom(3608);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const edges = Array.from({ length: random.int(0, 8) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(1, 6),
			]).filter(([u, v]) => u !== v);
			const k = random.int(1, n);
			expect(minTime(n, edges, k)).toBe(byBruteForce(n, edges, k));
		}
	});
});
