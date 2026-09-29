import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { graphValidTree } from ".";

/**
 * Connected and acyclic, checked with a depth-first search. Edges never repeat,
 * so reaching a visited node other than the one just left means a cycle.
 */
const byDefinition = (n: number, edges: number[][]): boolean => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const seen = new Set<number>([0]);
	const stack: [node: number, parent: number][] = [[0, -1]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, parent] = entry;
		for (const next of neighbours[node] ?? []) {
			if (next === parent) continue;
			if (seen.has(next)) return false;
			seen.add(next);
			stack.push([next, node]);
		}
	}
	return seen.size === n;
};

describe("261. Graph Valid Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			graphValidTree(5, [
				[0, 1],
				[0, 2],
				[0, 3],
				[1, 4],
			]),
		).toBeTrue();
		expect(
			graphValidTree(5, [
				[0, 1],
				[1, 2],
				[2, 3],
				[1, 3],
				[1, 4],
			]),
		).toBeFalse();
	});

	it("handles a single node and disconnected graphs with n - 1 edges", () => {
		expect(graphValidTree(1, [])).toBeTrue();
		expect(
			graphValidTree(4, [
				[0, 1],
				[1, 2],
				[2, 0],
			]),
		).toBeFalse();
	});

	it("matches checking connectivity and cycles on random graphs", () => {
		const random = createRandom(261);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 7);
			const edges = new Map<string, number[]>();
			for (let i = random.int(0, n + 1); i > 0; i--) {
				const a = random.int(0, n - 1);
				const b = random.int(0, n - 1);
				if (a !== b) edges.set(`${Math.min(a, b)},${Math.max(a, b)}`, [a, b]);
			}
			const list = [...edges.values()];
			expect(graphValidTree(n, list)).toBe(byDefinition(n, list));
		}
	});
});
