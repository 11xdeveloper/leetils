import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheCelebrity } from ".";

/** Runs the solution against a graph, counting calls to knows. */
const find = (graph: number[][]): [celebrity: number, calls: number] => {
	let calls = 0;
	const knows = (a: number, b: number): boolean => {
		calls++;
		return graph[a]?.[b] === 1;
	};
	return [findTheCelebrity(knows)(graph.length), calls];
};

const byDefinition = (graph: number[][]): number =>
	graph.findIndex((_, c) =>
		graph.every((row, i) => i === c || (row[c] === 1 && graph[c]?.[i] === 0)),
	);

describe("277. Find the Celebrity", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			find([
				[1, 1, 0],
				[0, 1, 0],
				[1, 1, 1],
			])[0],
		).toBe(1);
		expect(
			find([
				[1, 0, 1],
				[1, 1, 0],
				[0, 1, 1],
			])[0],
		).toBe(-1);
	});

	it("matches the definition within 3n calls on random parties", () => {
		const random = createRandom(277);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(2, 8);
			const graph = Array.from({ length: n }, (_, i) =>
				Array.from({ length: n }, (_, j) => (i === j ? 1 : random.int(0, 1))),
			);
			if (random.int(0, 1) === 0) {
				// Plant a celebrity.
				const c = random.int(0, n - 1);
				for (let i = 0; i < n; i++) {
					if (i === c) continue;
					(graph[i] ?? [])[c] = 1;
					(graph[c] ?? [])[i] = 0;
				}
			}
			const [celebrity, calls] = find(graph);
			expect(celebrity).toBe(byDefinition(graph));
			expect(calls).toBeLessThanOrEqual(3 * n);
		}
	});
});
