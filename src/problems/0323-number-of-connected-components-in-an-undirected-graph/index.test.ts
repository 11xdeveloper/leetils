import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfConnectedComponentsInAnUndirectedGraph as countComponents } from ".";

const bySearch = (n: number, edges: number[][]): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const seen = new Set<number>();
	let components = 0;
	for (let start = 0; start < n; start++) {
		if (seen.has(start)) continue;
		components++;
		const stack = [start];
		seen.add(start);
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			for (const next of neighbours[node] ?? []) {
				if (!seen.has(next)) {
					seen.add(next);
					stack.push(next);
				}
			}
		}
	}
	return components;
};

describe("323. Number of Connected Components in an Undirected Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countComponents(5, [
				[0, 1],
				[1, 2],
				[3, 4],
			]),
		).toBe(2);
		expect(
			countComponents(5, [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(1);
	});

	it("counts isolated nodes as components", () => {
		expect(countComponents(4, [[0, 1]])).toBe(3);
	});

	it("matches a depth-first search on random graphs", () => {
		const random = createRandom(323);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: random.int(0, n) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]).filter(([a, b]) => a !== b);
			expect(countComponents(n, edges)).toBe(bySearch(n, edges));
		}
	});
});
