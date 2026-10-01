import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { trimABinarySearchTree as trimBST } from ".";

const byRecursion = (
	node: TreeNode | null,
	low: number,
	high: number,
): TreeNode | null => {
	if (!node) return null;
	if (node.val < low) return byRecursion(node.right, low, high);
	if (node.val > high) return byRecursion(node.left, low, high);
	return new TreeNode(
		node.val,
		byRecursion(node.left, low, high),
		byRecursion(node.right, low, high),
	);
};

describe("669. Trim a Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(trimBST(treeFromArray([1, 0, 2]), 1, 2))).toEqual([
			1,
			null,
			2,
		]);
		expect(
			treeToArray(
				trimBST(treeFromArray([3, 0, 4, null, 2, null, null, 1]), 1, 3),
			),
		).toEqual([3, 2, null, 1]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(669);
		for (let run = 0; run < 1000; run++) {
			const values = random.array(random.int(1, 20), 0, 30);
			const low = random.int(0, 30);
			const high = random.int(low, 30);
			const expected = treeToArray(
				byRecursion(bstFromValues(values), low, high),
			);
			expect(treeToArray(trimBST(bstFromValues(values), low, high))).toEqual(
				expected,
			);
		}
	});
});
