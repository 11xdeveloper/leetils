import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { binaryTreeUpsideDown } from ".";

/** The recursive definition: flip the left subtree, then hang this node under it. */
const byRecursion = (node: TreeNode | null): TreeNode | null => {
	if (!node?.left) return node;
	const left = node.left;
	const newRoot = byRecursion(left);
	left.left = node.right;
	left.right = node;
	node.left = null;
	node.right = null;
	return newRoot;
};

const upsideDown = (values: (number | null)[]): (number | null)[] =>
	treeToArray(binaryTreeUpsideDown(treeFromArray(values)));

describe("156. Binary Tree Upside Down", () => {
	it("solves the examples from the problem statement", () => {
		expect(upsideDown([1, 2, 3, 4, 5])).toEqual([4, 5, 2, null, null, 3, 1]);
		expect(upsideDown([])).toEqual([]);
		expect(upsideDown([1])).toEqual([1]);
	});

	it("handles left children without right siblings", () => {
		expect(upsideDown([1, 2, null, 3])).toEqual([3, null, 2, null, 1]);
	});

	it("matches the recursive definition on random valid trees", () => {
		const random = createRandom(156);
		for (let run = 0; run < 300; run++) {
			// A left spine, where each left child may have a leaf as its right sibling.
			const build = (): TreeNode | null => {
				let root: TreeNode | null = null;
				for (let depth = random.int(0, 8); depth > 0; depth--) {
					const node: TreeNode = new TreeNode(random.int(1, 10), root);
					if (root && random.int(0, 1) === 0)
						node.right = new TreeNode(random.int(1, 10));
					root = node;
				}
				return root;
			};
			const tree = build();
			const expected = treeToArray(
				byRecursion(treeFromArray(treeToArray(tree))),
			);
			expect(treeToArray(binaryTreeUpsideDown(tree))).toEqual(expected);
		}
	});
});
