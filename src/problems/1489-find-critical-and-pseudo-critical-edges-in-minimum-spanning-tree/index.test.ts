import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findCriticalAndPseudoCriticalEdgesInMinimumSpanningTree as findCriticalAndPseudoCriticalEdges } from ".";

/** Lists every minimum spanning tree by trying every set of n − 1 edges. */
const byBruteForce = (n: number, edges: number[][]): number[][] => {
	const trees: number[][] = [];
	let best = Infinity;
	for (let mask = 0; mask < 2 ** edges.length; mask++) {
		const chosen = edges.map((_, i) => i).filter((i) => mask & (1 << i));
		if (chosen.length !== n - 1) continue;
		const reached = new Set([0]);
		for (let grew = true; grew; ) {
			grew = false;
			for (const i of chosen) {
				const [a = 0, b = 0] = edges[i] ?? [];
				if (reached.has(a) !== reached.has(b)) {
					reached.add(a);
					reached.add(b);
					grew = true;
				}
			}
		}
		if (reached.size !== n) continue;
		const weight = chosen.reduce((sum, i) => sum + (edges[i]?.[2] ?? 0), 0);
		if (weight < best) [best, trees.length] = [weight, 0];
		if (weight === best) trees.push(chosen);
	}
	const inAll = edges
		.map((_, i) => i)
		.filter((i) => trees.every((tree) => tree.includes(i)));
	const inSome = edges
		.map((_, i) => i)
		.filter(
			(i) => !inAll.includes(i) && trees.some((tree) => tree.includes(i)),
		);
	return [inAll, inSome];
};

describe("1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findCriticalAndPseudoCriticalEdges(5, [
				[0, 1, 1],
				[1, 2, 1],
				[2, 3, 2],
				[0, 3, 2],
				[0, 4, 3],
				[3, 4, 3],
				[1, 4, 6],
			]),
		).toEqual([
			[0, 1],
			[2, 3, 4, 5],
		]);
		expect(
			findCriticalAndPseudoCriticalEdges(4, [
				[0, 1, 1],
				[1, 2, 1],
				[2, 3, 1],
				[0, 3, 1],
			]),
		).toEqual([[], [0, 1, 2, 3]]);
	});

	it("matches listing every minimum spanning tree on random graphs", () => {
		const random = createRandom(1489);
		for (let run = 0; run < 150; run++) {
			const n = random.int(2, 5);
			const edges: number[][] = [];
			for (let v = 1; v < n; v++)
				edges.push([random.int(0, v - 1), v, random.int(1, 3)]);
			for (let a = 0; a < n; a++) {
				for (let b = a + 1; b < n; b++) {
					if (
						random.next() < 0.4 &&
						!edges.some(([x, y]) => x === a && y === b)
					)
						edges.push([a, b, random.int(1, 3)]);
				}
			}
			expect(findCriticalAndPseudoCriticalEdges(n, edges)).toEqual(
				byBruteForce(n, edges),
			);
		}
	});
});
