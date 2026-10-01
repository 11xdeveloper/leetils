import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { findDistanceInABinaryTree as findDistance } from ".";

/** Breadth-first search over the tree as an undirected graph. */
const byBruteForce = (root: TreeNode | null, p: number, q: number): number => {
	const neighbours = new Map<number, number[]>();
	const link = (a: number, b: number) =>
		neighbours.set(a, [...(neighbours.get(a) ?? []), b]);
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			link(node.val, child.val);
			link(child.val, node.val);
			stack.push(child);
		}
	}
	const dist = new Map([[p, 0]]);
	const queue = [p];
	for (let i = 0; i < queue.length; i++) {
		const value = queue[i] ?? 0;
		for (const next of neighbours.get(value) ?? []) {
			if (dist.has(next)) continue;
			dist.set(next, (dist.get(value) ?? 0) + 1);
			queue.push(next);
		}
	}
	return dist.get(q) ?? -1;
};

describe("1740. Find Distance in a Binary Tree", () => {
	const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

	it("solves the examples from the problem statement", () => {
		expect(findDistance(root, 5, 0)).toBe(3);
		expect(findDistance(root, 5, 7)).toBe(2);
		expect(findDistance(root, 5, 5)).toBe(0);
	});

	it("matches a breadth-first search on random trees", () => {
		const random = createRandom(1740);
		for (let run = 0; run < 200; run++) {
			const values: (number | null)[] = [0];
			for (let i = 1; i < 20; i++)
				values.push(random.int(0, 3) === 0 ? null : i);
			const tree = treeFromArray(values);
			const present: number[] = [];
			const stack = tree ? [tree] : [];
			for (let node = stack.pop(); node; node = stack.pop()) {
				present.push(node.val);
				if (node.left) stack.push(node.left);
				if (node.right) stack.push(node.right);
			}
			const p = present[random.int(0, present.length - 1)] ?? 0;
			const q = present[random.int(0, present.length - 1)] ?? 0;
			expect(findDistance(tree, p, q)).toBe(byBruteForce(tree, p, q));
		}
	});
});
