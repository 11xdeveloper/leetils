import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeMaxNumberOfEdgesToKeepGraphFullyTraversable as maxNumEdgesToRemove } from ".";

/** Tries keeping every subset of edges. */
const byBruteForce = (n: number, edges: number[][]): number => {
	const traversable = (kept: number[][], person: number) => {
		const reached = new Set([1]);
		for (let grew = true; grew; ) {
			grew = false;
			for (const [t, a = 0, b = 0] of kept) {
				if ((t === 3 || t === person) && reached.has(a) !== reached.has(b)) {
					reached.add(a);
					reached.add(b);
					grew = true;
				}
			}
		}
		return reached.size === n;
	};
	let best = -1;
	for (let mask = 0; mask < 2 ** edges.length; mask++) {
		const kept = edges.filter((_, i) => mask & (1 << i));
		if (traversable(kept, 1) && traversable(kept, 2))
			best = Math.max(best, edges.length - kept.length);
	}
	return best;
};

describe("1579. Remove Max Number of Edges to Keep Graph Fully Traversable", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxNumEdgesToRemove(4, [
				[3, 1, 2],
				[3, 2, 3],
				[1, 1, 3],
				[1, 2, 4],
				[1, 1, 2],
				[2, 3, 4],
			]),
		).toBe(2);
		expect(
			maxNumEdgesToRemove(4, [
				[3, 1, 2],
				[3, 2, 3],
				[1, 1, 4],
				[2, 1, 4],
			]),
		).toBe(0);
		expect(
			maxNumEdgesToRemove(4, [
				[3, 2, 3],
				[1, 1, 2],
				[2, 3, 4],
			]),
		).toBe(-1);
	});

	it("matches trying every subset of edges on random graphs", () => {
		const random = createRandom(1579);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 4);
			const keys = new Set<string>();
			for (let i = random.int(1, 9); i > 0; i--) {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				if (a !== b)
					keys.add(`${random.int(1, 3)},${Math.min(a, b)},${Math.max(a, b)}`);
			}
			const edges = [...keys].map((key) => key.split(",").map(Number));
			expect(maxNumEdgesToRemove(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
