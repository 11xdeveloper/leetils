import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { constructStringFromBinaryTree as tree2str } from ".";

const byRecursion = (node: TreeNode | null): string => {
	if (!node) return "";
	if (!node.left && !node.right) return String(node.val);
	if (!node.right) return `${node.val}(${byRecursion(node.left)})`;
	return `${node.val}(${byRecursion(node.left)})(${byRecursion(node.right)})`;
};

describe("606. Construct String from Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(tree2str(treeFromArray([1, 2, 3, 4]))).toBe("1(2(4))(3)");
		expect(tree2str(treeFromArray([1, 2, 3, null, 4]))).toBe("1(2()(4))(3)");
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(606);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -9, 9);
			expect(tree2str(root)).toBe(byRecursion(root));
		}
	});
});
