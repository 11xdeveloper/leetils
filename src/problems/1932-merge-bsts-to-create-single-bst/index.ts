import type { TreeNode } from "../../structures/tree-node";

/**
 * 1932. Merge BSTs to Create Single BST
 *
 * Each operation replaces a leaf of one tree with another tree whose root
 * has the leaf's value. Returns the single valid binary search tree left
 * after merging all `trees` (each with at most 3 nodes), or `null`.
 *
 * The final root must be the only root whose value isn't a leaf
 * elsewhere. Starting there, replace leaves with the matching trees
 * (explicit stack), then check that every tree was used and an in-order
 * walk is strictly increasing. Merges happen in place.
 *
 * @see https://leetcode.com/problems/merge-bsts-to-create-single-bst/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeToArray(mergeBstsToCreateSingleBst([[2, 1], [3, 2, 5], [5, 4]].map(treeFromArray))); // [3, 2, 5, 1, null, 4]
 */
export const mergeBstsToCreateSingleBst = (
	trees: readonly (TreeNode | null)[],
): TreeNode | null => {
	const byRoot = new Map<number, TreeNode>();
	const leaves = new Set<number>();
	for (const tree of trees) {
		if (!tree) continue;
		byRoot.set(tree.val, tree);
		for (const child of [tree.left, tree.right])
			if (child) leaves.add(child.val);
	}
	const roots = [...byRoot.values()].filter((tree) => !leaves.has(tree.val));
	const [root] = roots;
	if (roots.length !== 1 || !root) return null;
	byRoot.delete(root.val);
	const stack = [root];
	for (let node = stack.pop(); node; node = stack.pop()) {
		for (const side of ["left", "right"] as const) {
			const child = node[side];
			if (!child) continue;
			const subtree =
				!child.left && !child.right ? byRoot.get(child.val) : undefined;
			if (subtree) {
				node[side] = subtree;
				byRoot.delete(child.val);
			}
			stack.push(node[side] ?? child);
		}
	}
	if (byRoot.size > 0) return null;
	let previous = -Infinity;
	const path: TreeNode[] = [];
	for (let node: TreeNode | null = root; node || path.length > 0; ) {
		while (node) {
			path.push(node);
			node = node.left;
		}
		const current = path.pop();
		if (!current || current.val <= previous) return null;
		previous = current.val;
		node = current.right;
	}
	return root;
};
