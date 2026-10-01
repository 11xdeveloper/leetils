import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumHeightTrees } from ".";

/** Measures the height from every root with a breadth-first search. */
const byBruteForce = (n: number, edges: number[][]): number[] => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const heights = Array.from({ length: n }, (_, root) => {
		const depth = new Map([[root, 0]]);
		const queue = [root];
		for (let head = 0; head < queue.length; head++) {
			const node = queue[head] ?? 0;
			for (const next of neighbours[node] ?? []) {
				if (depth.has(next)) continue;
				depth.set(next, (depth.get(node) ?? 0) + 1);
				queue.push(next);
			}
		}
		return Math.max(...depth.values());
	});
	const lowest = Math.min(...heights);
	return heights.flatMap((h, root) => (h === lowest ? [root] : []));
};

describe("310. Minimum Height Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumHeightTrees(4, [
				[1, 0],
				[1, 2],
				[1, 3],
			]),
		).toEqual([1]);
		expect(
			minimumHeightTrees(6, [
				[3, 0],
				[3, 1],
				[3, 2],
				[3, 4],
				[5, 4],
			]).toSorted(),
		).toEqual([3, 4]);
	});

	it("handles one and two nodes", () => {
		expect(minimumHeightTrees(1, [])).toEqual([0]);
		expect(minimumHeightTrees(2, [[0, 1]])).toEqual([0, 1]);
	});

	it("matches measuring every root on random trees", () => {
		const random = createRandom(310);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				i + 1,
				random.int(0, i),
			]);
			expect(minimumHeightTrees(n, edges).toSorted((a, b) => a - b)).toEqual(
				byBruteForce(n, edges),
			);
		}
	});
});
