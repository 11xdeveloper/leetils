import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalSumOfInteractionCostInTreeGroups as interactionCosts } from ".";

/** Breadth-first search from every node. */
const byBruteForce = (
	n: number,
	edges: number[][],
	group: number[],
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	let total = 0;
	for (let s = 0; s < n; s++) {
		const distance = new Array<number>(n).fill(-1);
		distance[s] = 0;
		const queue = [s];
		for (let q = 0; q < queue.length; q++)
			for (const to of adjacent[queue[q] ?? 0] ?? [])
				if (distance[to] === -1) {
					distance[to] = (distance[queue[q] ?? 0] ?? 0) + 1;
					queue.push(to);
				}
		for (let t = s + 1; t < n; t++)
			if (group[s] === group[t]) total += distance[t] ?? 0;
	}
	return total;
};

describe("3786. Total Sum of Interaction Cost in Tree Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			interactionCosts(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[1, 1, 1],
			),
		).toBe(4);
		expect(
			interactionCosts(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[3, 2, 3],
			),
		).toBe(2);
		expect(
			interactionCosts(
				4,
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				[1, 1, 4, 4],
			),
		).toBe(3);
		expect(interactionCosts(2, [[0, 1]], [9, 8])).toBe(0);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(3786);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const group = random.array(n, 1, 3);
			expect(interactionCosts(n, edges, group)).toBe(
				byBruteForce(n, edges, group),
			);
		}
	});
});
