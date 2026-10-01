import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { binaryTreeTilt as findTilt } from ".";

const sum = (node: TreeNode | null): number =>
	node ? node.val + sum(node.left) + sum(node.right) : 0;

describe("563. Binary Tree Tilt", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTilt(treeFromArray([1, 2, 3]))).toBe(1);
		expect(findTilt(treeFromArray([4, 2, 9, 3, 5, null, 7]))).toBe(15);
		expect(findTilt(treeFromArray([21, 7, 14, 1, 1, 2, 2, 3, 3]))).toBe(9);
	});

	it("matches summing every subtree on random trees", () => {
		const random = createRandom(563);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -20, 20);
			const expected = nodesOf(root).reduce(
				(total, node) => total + Math.abs(sum(node.left) - sum(node.right)),
				0,
			);
			expect(findTilt(root)).toBe(expected);
		}
	});
});
