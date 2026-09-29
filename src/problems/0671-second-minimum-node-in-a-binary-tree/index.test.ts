import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom, type Random } from "../../testing/random";
import { nodesOf } from "../../testing/trees";
import { secondMinimumNodeInABinaryTree as findSecondMinimumValue } from ".";

/** A random tree where each node has 0 or 2 children and holds the smaller child's value. */
const specialTree = (random: Random, depth: number): TreeNode => {
	if (depth === 0 || random.int(0, 2) === 0)
		return new TreeNode(random.int(1, 6));
	const left = specialTree(random, depth - 1);
	const right = specialTree(random, depth - 1);
	return new TreeNode(Math.min(left.val, right.val), left, right);
};

describe("671. Second Minimum Node In a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findSecondMinimumValue(treeFromArray([2, 2, 5, null, null, 5, 7])),
		).toBe(5);
		expect(findSecondMinimumValue(treeFromArray([2, 2, 2]))).toBe(-1);
	});

	it("matches sorting every value on random special trees", () => {
		const random = createRandom(671);
		for (let run = 0; run < 1000; run++) {
			const root = specialTree(random, 4);
			const distinct = [...new Set(nodesOf(root).map((node) => node.val))].sort(
				(a, b) => a - b,
			);
			expect(findSecondMinimumValue(root)).toBe(distinct[1] ?? -1);
		}
	});
});
