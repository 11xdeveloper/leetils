import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { splitBst as splitBST } from ".";

const byRecursion = (
	node: TreeNode | null,
	target: number,
): [TreeNode | null, TreeNode | null] => {
	if (!node) return [null, null];
	const copy = new TreeNode(node.val, node.left, node.right);
	if (node.val <= target) {
		const [small, large] = byRecursion(node.right, target);
		copy.right = small;
		return [copy, large];
	}
	const [small, large] = byRecursion(node.left, target);
	copy.left = large;
	return [small, copy];
};

describe("776. Split BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			splitBST(treeFromArray([4, 2, 6, 1, 3, 5, 7]), 2).map(treeToArray),
		).toEqual([
			[2, 1],
			[4, 3, 6, null, null, 5, 7],
		]);
		expect(splitBST(treeFromArray([1]), 1).map(treeToArray)).toEqual([[1], []]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(776);
		for (let run = 0; run < 1000; run++) {
			const values = random.array(random.int(1, 20), 0, 30);
			const target = random.int(-1, 31);
			const expected = byRecursion(bstFromValues(values), target).map(
				treeToArray,
			);
			expect(splitBST(bstFromValues(values), target).map(treeToArray)).toEqual(
				expected,
			);
		}
	});
});
