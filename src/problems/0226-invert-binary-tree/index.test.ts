import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { invertBinaryTree } from ".";

const mirror = (node: TreeNode | null): TreeNode | null =>
	node && new TreeNode(node.val, mirror(node.right), mirror(node.left));

describe("226. Invert Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(invertBinaryTree(treeFromArray([4, 2, 7, 1, 3, 6, 9]))),
		).toEqual([4, 7, 2, 9, 6, 3, 1]);
		expect(treeToArray(invertBinaryTree(treeFromArray([2, 1, 3])))).toEqual([
			2, 3, 1,
		]);
		expect(invertBinaryTree(null)).toBeNull();
	});

	it("matches building the mirror image on random trees", () => {
		const random = createRandom(226);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, -9, 9);
			const expected = treeToArray(mirror(root));
			expect(treeToArray(invertBinaryTree(root))).toEqual(expected);
		}
	});
});
