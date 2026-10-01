import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { redundantConnectionII as findRedundantDirectedConnection } from ".";

/** Whether the edges form a tree rooted at the one node with no parent, reaching every node. */
const isRootedTree = (n: number, edges: number[][]): boolean => {
	const parents = new Array<number>(n + 1).fill(0);
	for (const [, to = 0] of edges) parents[to] = (parents[to] ?? 0) + 1;
	const roots = parents
		.slice(1)
		.flatMap((count, i) => (count === 0 ? [i + 1] : []));
	if (roots.length !== 1 || parents.some((count) => count > 1)) return false;
	const reached = new Set(roots);
	const queue = [...roots];
	for (const node of queue) {
		for (const [from, to = 0] of edges) {
			if (from === node && !reached.has(to)) {
				reached.add(to);
				queue.push(to);
			}
		}
	}
	return reached.size === n;
};

const byRemoval = (edges: number[][]): number[] => {
	for (let skip = edges.length - 1; skip >= 0; skip--) {
		if (
			isRootedTree(
				edges.length,
				edges.filter((_, i) => i !== skip),
			)
		)
			return edges[skip] ?? [];
	}
	return [];
};

describe("685. Redundant Connection II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findRedundantDirectedConnection([
				[1, 2],
				[1, 3],
				[2, 3],
			]),
		).toEqual([2, 3]);
		expect(
			findRedundantDirectedConnection([
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 1],
				[1, 5],
			]),
		).toEqual([4, 1]);
	});

	it("matches trying each removal on random graphs", () => {
		const random = createRandom(685);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(3, 8);
			const labels = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			const edges: number[][] = [];
			for (let i = 1; i < n; i++)
				edges.push([labels[random.int(0, i - 1)] ?? 1, labels[i] ?? 1]);
			let from = random.int(1, n);
			let to = random.int(1, n);
			while (from === to || edges.some(([a, b]) => a === from && b === to))
				[from, to] = [random.int(1, n), random.int(1, n)];
			edges.push([from, to]);
			edges.sort(() => random.next() - 0.5);
			expect(findRedundantDirectedConnection(edges)).toEqual(byRemoval(edges));
		}
	});
});
