import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { validateBinarySearchTree } from "../0098-validate-binary-search-tree";
import { deleteNodeInABst } from ".";

describe("450. Delete Node in a BST", () => {
	it("solves the examples from the problem statement", () => {
		const result = deleteNodeInABst(treeFromArray([5, 3, 6, 2, 4, null, 7]), 3);
		expect(inorderValues(result)).toEqual([2, 4, 5, 6, 7]);
		expect(validateBinarySearchTree(result)).toBeTrue();
		expect(
			treeToArray(deleteNodeInABst(treeFromArray([5, 3, 6, 2, 4, null, 7]), 0)),
		).toEqual([5, 3, 6, 2, 4, null, 7]);
		expect(deleteNodeInABst(null, 0)).toBeNull();
	});

	it("deletes the root, including when it's the only node", () => {
		expect(deleteNodeInABst(treeFromArray([1]), 1)).toBeNull();
		expect(
			inorderValues(deleteNodeInABst(treeFromArray([2, 1, 3]), 2)),
		).toEqual([1, 3]);
	});

	it("keeps random binary search trees valid while deleting every kind of node", () => {
		const random = createRandom(450);
		for (let run = 0; run < 500; run++) {
			let root = bstFromValues(random.array(random.int(1, 25), 0, 40));
			const values = inorderValues(root);
			for (let i = 0; i < 5; i++) {
				const key = random.int(0, 40);
				root = deleteNodeInABst(root, key);
				const index = values.indexOf(key);
				if (index !== -1) values.splice(index, 1);
				expect(inorderValues(root)).toEqual(values);
				expect(validateBinarySearchTree(root)).toBeTrue();
			}
		}
	});
});
