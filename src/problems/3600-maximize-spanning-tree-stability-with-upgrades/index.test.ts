import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSpanningTreeStabilityWithUpgrades as maxStability } from ".";

/** Tries every set of n - 1 edges and every set of upgrades. */
const byBruteForce = (n: number, edges: number[][], k: number): number => {
	let best = -1;
	for (let mask = 0; mask < 1 << edges.length; mask++) {
		const chosen = edges.filter((_, i) => (mask >> i) & 1);
		if (
			chosen.length !== n - 1 ||
			edges.some((e, i) => e[3] && !((mask >> i) & 1))
		)
			continue;
		const parent = Array.from({ length: n }, (_, i) => i);
		const find = (x: number): number =>
			parent[x] === x ? x : find(parent[x] ?? x);
		let ok = true;
		for (const [u = 0, v = 0] of chosen) {
			const [a, b] = [find(u), find(v)];
			if (a === b) ok = false;
			parent[a] = b;
		}
		if (!ok) continue;
		// Upgrade the weakest optional edges first.
		const strengths = chosen
			.filter((e) => !e[3])
			.map((e) => e[2] ?? 0)
			.sort((a, b) => a - b);
		const upgraded = strengths.map((s, i) => (i < k ? 2 * s : s));
		const all = [
			...upgraded,
			...chosen.filter((e) => e[3]).map((e) => e[2] ?? 0),
		];
		best = Math.max(best, all.length === 0 ? 0 : Math.min(...all));
	}
	return best;
};

describe("3600. Maximize Spanning Tree Stability with Upgrades", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxStability(
				3,
				[
					[0, 1, 2, 1],
					[1, 2, 3, 0],
				],
				1,
			),
		).toBe(2);
		expect(
			maxStability(
				3,
				[
					[0, 1, 4, 0],
					[1, 2, 3, 0],
					[0, 2, 1, 0],
				],
				2,
			),
		).toBe(6);
		expect(
			maxStability(
				3,
				[
					[0, 1, 1, 1],
					[1, 2, 1, 1],
					[2, 0, 1, 1],
				],
				0,
			),
		).toBe(-1);
	});

	it("matches trying every tree on random graphs", () => {
		const random = createRandom(3600);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 5);
			const edges: number[][] = [];
			for (let u = 0; u < n; u++)
				for (let v = u + 1; v < n; v++)
					if (random.int(0, 2) > 0)
						edges.push([
							u,
							v,
							random.int(1, 10),
							random.int(0, 4) === 0 ? 1 : 0,
						]);
			if (edges.length === 0) continue;
			const k = random.int(0, 3);
			expect(maxStability(n, edges, k)).toBe(byBruteForce(n, edges, k));
		}
	});
});
