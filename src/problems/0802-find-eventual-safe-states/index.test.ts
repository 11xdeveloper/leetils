import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findEventualSafeStates as eventualSafeNodes } from ".";

/** A node is unsafe if it can reach a cycle, found by searching from each node. */
const byReachingCycles = (graph: number[][]): number[] => {
	const onCycle = graph.map((_, start) => {
		const seen = new Set<number>();
		const stack = [...(graph[start] ?? [])];
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			if (node === start) return true;
			if (seen.has(node)) continue;
			seen.add(node);
			stack.push(...(graph[node] ?? []));
		}
		return false;
	});
	return graph
		.map((_, start) => start)
		.filter((start) => {
			const seen = new Set([start]);
			const queue = [start];
			for (const node of queue) {
				if (onCycle[node]) return false;
				for (const next of graph[node] ?? []) {
					if (seen.has(next)) continue;
					seen.add(next);
					queue.push(next);
				}
			}
			return true;
		});
};

describe("802. Find Eventual Safe States", () => {
	it("solves the examples from the problem statement", () => {
		expect(eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []])).toEqual([
			2, 4, 5, 6,
		]);
		expect(
			eventualSafeNodes([[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]),
		).toEqual([4]);
	});

	it("matches checking whether each node reaches a cycle on random graphs", () => {
		const random = createRandom(802);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const graph = Array.from({ length: n }, () => [
				...new Set(random.array(random.int(0, 2), 0, n - 1)),
			]);
			expect(eventualSafeNodes(graph)).toEqual(byReachingCycles(graph));
		}
	});
});
