import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf, randomTree } from "../../testing/trees";
import { validateBinarySearchTree } from ".";

/** Checks every node against every value in its subtrees. */
const byDefinition = (root: TreeNode | null): boolean =>
	nodesOf(root).every(
		(node) =>
			nodesOf(node.left).every((left) => left.val < node.val) &&
			nodesOf(node.right).every((right) => right.val > node.val),
	);

describe("98. Validate Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(validateBinarySearchTree(treeFromArray([2, 1, 3]))).toBeTrue();
		expect(
			validateBinarySearchTree(treeFromArray([5, 1, 4, null, null, 3, 6])),
		).toBeFalse();
	});

	it("rejects equal values", () => {
		expect(validateBinarySearchTree(treeFromArray([2, 2, 2]))).toBeFalse();
		expect(validateBinarySearchTree(treeFromArray([1, 1]))).toBeFalse();
	});

	it("checks against every ancestor, not just the parent", () => {
		expect(
			validateBinarySearchTree(treeFromArray([5, 4, 6, null, null, 3, 7])),
		).toBeFalse();
	});

	it("handles values at the 32-bit limits", () => {
		expect(validateBinarySearchTree(treeFromArray([-(2 ** 31)]))).toBeTrue();
		expect(
			validateBinarySearchTree(treeFromArray([2 ** 31 - 1, 2 ** 31 - 1])),
		).toBeFalse();
	});

	it("accepts trees built by inserting into a binary search tree", () => {
		const random = createRandom(98);
		for (let run = 0; run < 200; run++) {
			expect(
				validateBinarySearchTree(bstFromValues(random.array(20, 0, 50))),
			).toBeTrue();
		}
	});

	it("matches the definition on random trees", () => {
		const random = createRandom(980);
		for (let run = 0; run < 1000; run++) {
			const root = randomTree(random, 6, 0, 6);
			expect(validateBinarySearchTree(root)).toBe(byDefinition(root));
		}
	});
});
