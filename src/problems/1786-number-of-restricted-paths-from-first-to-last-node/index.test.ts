import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfRestrictedPathsFromFirstToLastNode as countRestrictedPaths } from ".";

/** Floyd–Warshall distances and a direct count of strictly decreasing paths. */
const byBruteForce = (n: number, edges: number[][]): number => {
	const dist = Array.from({ length: n + 1 }, (_, i) =>
		Array.from({ length: n + 1 }, (_, j) => (i === j ? 0 : Infinity)),
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		const [rowU, rowV] = [dist[u], dist[v]];
		if (rowU) rowU[v] = Math.min(rowU[v] ?? Infinity, w);
		if (rowV) rowV[u] = Math.min(rowV[u] ?? Infinity, w);
	}
	for (let k = 1; k <= n; k++)
		for (const row of dist)
			for (let j = 1; j <= n; j++)
				row[j] = Math.min(
					row[j] ?? Infinity,
					(row[k] ?? Infinity) + (dist[k]?.[j] ?? Infinity),
				);
	const toEnd = (node: number) => dist[node]?.[n] ?? Infinity;
	const count = (node: number): number => {
		if (node === n) return 1;
		let total = 0;
		for (const [u, v] of edges) {
			const next = u === node ? v : v === node ? u : undefined;
			if (next !== undefined && toEnd(next) < toEnd(node)) total += count(next);
		}
		return total;
	};
	return count(1);
};

describe("1786. Number of Restricted Paths From First to Last Node", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countRestrictedPaths(5, [
				[1, 2, 3],
				[1, 3, 3],
				[2, 3, 1],
				[1, 4, 2],
				[5, 2, 2],
				[3, 5, 1],
				[5, 4, 10],
			]),
		).toBe(3);
		expect(
			countRestrictedPaths(7, [
				[1, 3, 1],
				[4, 1, 2],
				[7, 3, 4],
				[2, 5, 3],
				[5, 6, 1],
				[6, 7, 2],
				[7, 5, 3],
				[2, 6, 4],
			]),
		).toBe(1);
	});

	it("matches counting paths directly on random connected graphs", () => {
		const random = createRandom(1786);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
				random.int(1, 5),
			]);
			for (let extra = random.int(0, 5); extra > 0; extra--) {
				const u = random.int(1, n);
				edges.push([u, ((u + random.int(0, n - 2)) % n) + 1, random.int(1, 5)]);
			}
			expect(countRestrictedPaths(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
