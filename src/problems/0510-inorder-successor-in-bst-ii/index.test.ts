import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import {
	type TreeNodeWithParent,
	treeWithParentFromArray,
} from "../../structures/tree-node-with-parent";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { inorderSuccessorInBstII as inorderSuccessor } from ".";

const inorder = (root: TreeNodeWithParent | null): TreeNodeWithParent[] => {
	const nodes: TreeNodeWithParent[] = [];
	const visit = (node: TreeNodeWithParent | null): void => {
		if (!node) return;
		visit(node.left);
		nodes.push(node);
		visit(node.right);
	};
	visit(root);
	return nodes;
};

describe("510. Inorder Successor in BST II", () => {
	it("solves the examples from the problem statement", () => {
		const root = treeWithParentFromArray([2, 1, 3]);
		expect(inorderSuccessor(root?.left ?? null)).toBe(root);
		const other = treeWithParentFromArray([5, 3, 6, 2, 4, null, null, 1]);
		expect(inorderSuccessor(other?.right ?? null)).toBeNull();
	});

	it("gives the next node in order for every node of random trees", () => {
		const random = createRandom(510);
		for (let run = 0; run < 300; run++) {
			const values = [...new Set(random.array(random.int(1, 25), -50, 50))];
			const root = treeWithParentFromArray(treeToArray(bstFromValues(values)));
			const nodes = inorder(root);
			for (const [i, node] of nodes.entries())
				expect(inorderSuccessor(node)).toBe(nodes[i + 1] ?? null);
		}
	});
});
