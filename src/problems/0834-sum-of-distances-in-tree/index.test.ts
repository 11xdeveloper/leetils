import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfDistancesInTree } from ".";

/** Breadth-first search from every node. */
const byBruteForce = (n: number, edges: number[][]): number[] =>
	Array.from({ length: n }, (_, start) => {
		const distance = new Map([[start, 0]]);
		const queue = [start];
		for (const node of queue) {
			for (const [a, b] of edges) {
				const next = a === node ? b : b === node ? a : undefined;
				if (next !== undefined && !distance.has(next)) {
					distance.set(next, (distance.get(node) ?? 0) + 1);
					queue.push(next);
				}
			}
		}
		return [...distance.values()].reduce((sum, d) => sum + d, 0);
	});

describe("834. Sum of Distances in Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumOfDistancesInTree(6, [
				[0, 1],
				[0, 2],
				[2, 3],
				[2, 4],
				[2, 5],
			]),
		).toEqual([8, 12, 6, 10, 10, 10]);
		expect(sumOfDistancesInTree(1, [])).toEqual([0]);
		expect(sumOfDistancesInTree(2, [[1, 0]])).toEqual([1, 1]);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(834);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			expect(sumOfDistancesInTree(n, edges)).toEqual(byBruteForce(n, edges));
		}
	});

	it("handles a long path", () => {
		const n = 30_000;
		const result = sumOfDistancesInTree(
			n,
			Array.from({ length: n - 1 }, (_, i) => [i, i + 1]),
		);
		expect(result[0]).toBe((n * (n - 1)) / 2);
	});
});
