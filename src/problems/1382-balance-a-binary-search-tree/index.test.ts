import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues, nodesOf } from "../../testing/trees";
import { balanceABinarySearchTree as balanceBST } from ".";

const height = (node: TreeNode | null): number =>
	node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
const isBalanced = (root: TreeNode | null) =>
	nodesOf(root).every(
		(node) => Math.abs(height(node.left) - height(node.right)) <= 1,
	);

describe("1382. Balance a Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		const result = balanceBST(
			treeFromArray([1, null, 2, null, 3, null, 4, null, null]),
		);
		expect(inorderValues(result)).toEqual([1, 2, 3, 4]);
		expect(isBalanced(result)).toBeTrue();
		expect(inorderValues(balanceBST(treeFromArray([2, 1, 3])))).toEqual([
			1, 2, 3,
		]);
	});

	it("balances a deep chain", () => {
		const values = Array.from({ length: 10000 }, (_, i) => i + 1);
		const result = balanceBST(bstFromValues(values));
		expect(inorderValues(result)).toEqual(values);
		expect(height(result)).toBe(14);
	});

	it("keeps the values and balances random trees", () => {
		const random = createRandom(1382);
		for (let run = 0; run < 200; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), 1, 100));
			const result = balanceBST(root);
			expect(inorderValues(result)).toEqual(inorderValues(root));
			expect(isBalanced(result)).toBeTrue();
		}
	});
});
