import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { insufficientNodesInRootToLeafPaths as sufficientSubset } from ".";

const byRecursion = (
	node: TreeNode | null,
	limit: number,
	above = 0,
): TreeNode | null => {
	if (!node) return null;
	const sum = above + node.val;
	if (!node.left && !node.right)
		return sum >= limit ? new TreeNode(node.val) : null;
	const [left, right] = [
		byRecursion(node.left, limit, sum),
		byRecursion(node.right, limit, sum),
	];
	return left || right ? new TreeNode(node.val, left, right) : null;
};

describe("1080. Insufficient Nodes in Root to Leaf Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				sufficientSubset(
					treeFromArray([
						1, 2, 3, 4, -99, -99, 7, 8, 9, -99, -99, 12, 13, -99, 14,
					]),
					1,
				),
			),
		).toEqual([1, 2, 3, 4, null, null, 7, 8, 9, null, 14]);
		expect(
			treeToArray(
				sufficientSubset(
					treeFromArray([5, 4, 8, 11, null, 17, 4, 7, 1, null, null, 5, 3]),
					22,
				),
			),
		).toEqual([5, 4, 8, 11, null, 17, 4, 7, null, null, null, 5]);
		expect(
			treeToArray(
				sufficientSubset(treeFromArray([1, 2, -3, -5, null, 4, null]), -1),
			),
		).toEqual([1, null, -3, 4]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(1080);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, -5, 5);
			const limit = random.int(-8, 8);
			const expected = treeToArray(byRecursion(root, limit));
			expect(treeToArray(sufficientSubset(root, limit))).toEqual(expected);
		}
	});
});
