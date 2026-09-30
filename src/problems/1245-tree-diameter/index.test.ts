import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { treeDiameter } from ".";

/** Measures the distance between every pair of nodes. */
const byBruteForce = (edges: number[][]): number => {
	const n = edges.length + 1;
	let longest = 0;
	for (let start = 0; start < n; start++) {
		const distance = new Map([[start, 0]]);
		for (let grew = true; grew; ) {
			grew = false;
			for (const [a = 0, b = 0] of edges) {
				for (const [from, to] of [
					[a, b],
					[b, a],
				] as const) {
					if (distance.has(from) && !distance.has(to)) {
						distance.set(to, (distance.get(from) ?? 0) + 1);
						grew = true;
					}
				}
			}
		}
		longest = Math.max(longest, ...distance.values());
	}
	return longest;
};

describe("1245. Tree Diameter", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeDiameter([
				[0, 1],
				[0, 2],
			]),
		).toBe(2);
		expect(
			treeDiameter([
				[0, 1],
				[1, 2],
				[2, 3],
				[1, 4],
				[4, 5],
			]),
		).toBe(4);
	});

	it("handles a single node and a long path", () => {
		expect(treeDiameter([])).toBe(0);
		const path = Array.from({ length: 9999 }, (_, i) => [i, i + 1]);
		expect(treeDiameter(path)).toBe(9999);
	});

	it("matches measuring every pair on random trees", () => {
		const random = createRandom(1245);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			expect(treeDiameter(edges)).toBe(byBruteForce(edges));
		}
	});
});
