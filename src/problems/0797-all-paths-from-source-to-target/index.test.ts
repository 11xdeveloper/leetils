import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { allPathsFromSourceToTarget as allPathsSourceTarget } from ".";

const byRecursion = (graph: number[][]): number[][] => {
	const target = graph.length - 1;
	const from = (node: number): number[][] =>
		node === target
			? [[node]]
			: (graph[node] ?? []).flatMap((next) =>
					from(next).map((path) => [node, ...path]),
				);
	return from(0);
};

describe("797. All Paths From Source to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(allPathsSourceTarget([[1, 2], [3], [3], []])).toEqual([
			[0, 1, 3],
			[0, 2, 3],
		]);
		expect(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []])).toEqual([
			[0, 4],
			[0, 3, 4],
			[0, 1, 3, 4],
			[0, 1, 2, 3, 4],
			[0, 1, 4],
		]);
	});

	it("matches recursion on random acyclic graphs", () => {
		const random = createRandom(797);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const graph = Array.from({ length: n }, (_, i) =>
				Array.from({ length: n - i - 1 }, (_, k) => i + 1 + k).filter(
					() => random.int(0, 1) === 1,
				),
			);
			expect(allPathsSourceTarget(graph)).toEqual(byRecursion(graph));
		}
	});
});
