import { describe, expect, it } from "bun:test";
import {
	NaryTreeNode,
	naryTreeFromArray,
} from "../../structures/nary-tree-node";
import { createRandom } from "../../testing/random";
import { diameterOfNAryTree as diameter } from ".";

/** Breadth-first search from every node over the undirected tree. */
const byBruteForce = (nodes: NaryTreeNode[]): number => {
	const neighbours = new Map<NaryTreeNode, NaryTreeNode[]>(
		nodes.map((node) => [node, []]),
	);
	for (const node of nodes) {
		for (const child of node.children) {
			neighbours.get(node)?.push(child);
			neighbours.get(child)?.push(node);
		}
	}
	let longest = 0;
	for (const start of nodes) {
		const distance = new Map([[start, 0]]);
		const queue = [start];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i] ?? start;
			for (const next of neighbours.get(node) ?? []) {
				if (distance.has(next)) continue;
				distance.set(next, (distance.get(node) ?? 0) + 1);
				queue.push(next);
			}
		}
		longest = Math.max(longest, ...distance.values());
	}
	return longest;
};

describe("1522. Diameter of N-Ary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(diameter(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]))).toBe(3);
		expect(
			diameter(naryTreeFromArray([1, null, 2, null, 3, 4, null, 5, null, 6])),
		).toBe(4);
		expect(
			diameter(
				naryTreeFromArray([
					1,
					null,
					2,
					3,
					4,
					5,
					null,
					null,
					6,
					7,
					null,
					8,
					null,
					9,
					10,
					null,
					null,
					11,
					null,
					12,
					null,
					13,
					null,
					null,
					14,
				]),
			),
		).toBe(7);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(1522);
		for (let run = 0; run < 200; run++) {
			const nodes = [new NaryTreeNode(0)];
			for (let i = 1; i < random.int(1, 15); i++) {
				const node = new NaryTreeNode(i);
				nodes[random.int(0, nodes.length - 1)]?.children.push(node);
				nodes.push(node);
			}
			expect(diameter(nodes[0] ?? null)).toBe(byBruteForce(nodes));
		}
	});
});
