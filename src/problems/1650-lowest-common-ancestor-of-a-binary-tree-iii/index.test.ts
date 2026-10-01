import { describe, expect, it } from "bun:test";
import {
	type TreeNodeWithParent,
	treeWithParentFromArray,
} from "../../structures/tree-node-with-parent";
import { createRandom } from "../../testing/random";
import { lowestCommonAncestorOfABinaryTreeIII as lowestCommonAncestor } from ".";

const nodesOf = (root: TreeNodeWithParent | null): TreeNodeWithParent[] => {
	const nodes: TreeNodeWithParent[] = [];
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		nodes.push(node);
		if (node.right) stack.push(node.right);
		if (node.left) stack.push(node.left);
	}
	return nodes;
};

const find = (
	root: TreeNodeWithParent | null,
	val: number,
): TreeNodeWithParent => {
	const node = nodesOf(root).find((n) => n.val === val);
	if (!node) throw new Error(`No node with value ${val}`);
	return node;
};

describe("1650. Lowest Common Ancestor of a Binary Tree III", () => {
	it("solves the examples from the problem statement", () => {
		const root = treeWithParentFromArray([
			3,
			5,
			1,
			6,
			2,
			0,
			8,
			null,
			null,
			7,
			4,
		]);
		expect(lowestCommonAncestor(find(root, 5), find(root, 1)).val).toBe(3);
		expect(lowestCommonAncestor(find(root, 5), find(root, 4)).val).toBe(5);
		const small = treeWithParentFromArray([1, 2]);
		expect(lowestCommonAncestor(find(small, 1), find(small, 2)).val).toBe(1);
	});

	it("matches comparing ancestor chains on random trees", () => {
		const random = createRandom(1650);
		for (let run = 0; run < 200; run++) {
			const size = random.int(1, 12);
			const values: (number | null)[] = [0];
			for (let i = 1; values.filter((v) => v !== null).length < size; i++)
				values.push(random.int(0, 2) === 0 ? null : i);
			const root = treeWithParentFromArray(values);
			const nodes = nodesOf(root);
			const p = nodes[random.int(0, nodes.length - 1)];
			const q = nodes[random.int(0, nodes.length - 1)];
			if (!p || !q) continue;
			const ancestors = new Set<TreeNodeWithParent>();
			for (let node: TreeNodeWithParent | null = p; node; node = node.parent)
				ancestors.add(node);
			let expected: TreeNodeWithParent | null = q;
			while (expected && !ancestors.has(expected)) expected = expected.parent;
			expect(lowestCommonAncestor(p, q)).toBe(expected ?? p);
		}
	});
});
