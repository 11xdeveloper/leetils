import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf } from "../../testing/trees";
import { inorderSuccessorInBst } from ".";

const find = (root: TreeNode | null, val: number): TreeNode => {
	const node = nodesOf(root).find((n) => n.val === val);
	if (!node) throw new Error(`No node with value ${val}`);
	return node;
};

describe("285. Inorder Successor in BST", () => {
	it("solves the examples from the problem statement", () => {
		const first = treeFromArray([2, 1, 3]);
		expect(inorderSuccessorInBst(first, find(first, 1))?.val).toBe(2);
		const second = treeFromArray([5, 3, 6, 2, 4, null, null, 1]);
		expect(inorderSuccessorInBst(second, find(second, 6))).toBeNull();
	});

	it("returns the next node in inorder for every node of random binary search trees", () => {
		const random = createRandom(285);
		for (let run = 0; run < 300; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), -100, 100));
			const inorder = nodesOf(root).toSorted((a, b) => a.val - b.val);
			for (const [i, node] of inorder.entries()) {
				expect(inorderSuccessorInBst(root, node)).toBe(inorder[i + 1] ?? null);
			}
		}
	});
});
