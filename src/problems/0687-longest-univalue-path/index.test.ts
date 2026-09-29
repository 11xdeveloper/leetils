import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { longestUnivaluePath } from ".";

/** Breadth-first search from every node through neighbours with the same value. */
const byBruteForce = (root: TreeNode | null): number => {
	const nodes = nodesOf(root);
	const neighbours = new Map<TreeNode, TreeNode[]>(
		nodes.map((node) => [node, []]),
	);
	for (const node of nodes) {
		for (const child of [node.left, node.right]) {
			if (!child || child.val !== node.val) continue;
			neighbours.get(node)?.push(child);
			neighbours.get(child)?.push(node);
		}
	}
	let best = 0;
	for (const start of nodes) {
		const distance = new Map([[start, 0]]);
		const queue = [start];
		for (const node of queue) {
			for (const next of neighbours.get(node) ?? []) {
				if (distance.has(next)) continue;
				distance.set(next, (distance.get(node) ?? 0) + 1);
				best = Math.max(best, distance.get(next) ?? 0);
				queue.push(next);
			}
		}
	}
	return best;
};

describe("687. Longest Univalue Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestUnivaluePath(treeFromArray([5, 4, 5, 1, 1, null, 5]))).toBe(
			2,
		);
		expect(longestUnivaluePath(treeFromArray([1, 4, 5, 4, 4, null, 5]))).toBe(
			2,
		);
		expect(longestUnivaluePath(null)).toBe(0);
	});

	it("matches searching from every node on random trees", () => {
		const random = createRandom(687);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 2);
			expect(longestUnivaluePath(root)).toBe(byBruteForce(root));
		}
	});
});
