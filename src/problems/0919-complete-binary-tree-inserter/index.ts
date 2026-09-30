import { TreeNode } from "../../structures/tree-node";

/**
 * 919. Complete Binary Tree Inserter
 *
 * Built from a complete binary tree, `insert(val)` adds a node keeping the
 * tree complete and returns its parent's value, and `get_root` returns the
 * root. The method names follow LeetCode's.
 *
 * Keeps the nodes in level order, as in an array-backed heap: the parent of
 * node `i` is node `⌊(i - 1) / 2⌋`, so a new node's parent is known
 * directly.
 *
 * @see https://leetcode.com/problems/complete-binary-tree-inserter/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(1) per insert
 * @spaceComplexity O(n)
 *
 * @example
 * const inserter = new CompleteBinaryTreeInserter(treeFromArray([1, 2]));
 * inserter.insert(3); // 1
 * inserter.insert(4); // 2
 */
export class CompleteBinaryTreeInserter {
	readonly #nodes: TreeNode[] = [];

	constructor(root: TreeNode | null) {
		if (root) this.#nodes.push(root);
		for (let i = 0; i < this.#nodes.length; i++) {
			const node = this.#nodes[i];
			if (node?.left) this.#nodes.push(node.left);
			if (node?.right) this.#nodes.push(node.right);
		}
	}

	insert(val: number): number {
		const node = new TreeNode(val);
		const parent = this.#nodes[Math.floor((this.#nodes.length - 1) / 2)];
		this.#nodes.push(node);
		if (!parent) return -1;
		if (!parent.left) parent.left = node;
		else parent.right = node;
		return parent.val;
	}

	get_root(): TreeNode | null {
		return this.#nodes[0] ?? null;
	}
}
