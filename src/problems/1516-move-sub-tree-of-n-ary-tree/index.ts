import type { NaryTreeNode } from "../../structures/nary-tree-node";

/**
 * 1516. Move Sub-Tree of N-Ary Tree
 *
 * Moves node `p` (with its subtree) to be the last child of node `q`, in
 * place, and returns the root. Nothing changes if `p` is already a child of
 * `q`. If `q` is inside `p`'s subtree, `q` first takes `p`'s place so the
 * tree stays connected.
 *
 * Records every node's parent, then relinks: detach `p`; if `q` was below
 * `p`, detach `q` and put it where `p` was (making it the root if `p` was);
 * finally append `p` to `q`'s children.
 *
 * @see https://leetcode.com/problems/move-sub-tree-of-n-ary-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * naryTreeToArray(moveSubTreeOfNAryTree(root, p, q)); // the tree with p moved under q
 */
export const moveSubTreeOfNAryTree = (
	root: NaryTreeNode | null,
	p: NaryTreeNode,
	q: NaryTreeNode,
): NaryTreeNode | null => {
	const parent = new Map<NaryTreeNode, NaryTreeNode>();
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		for (const child of node.children) {
			parent.set(child, node);
			stack.push(child);
		}
	}
	if (parent.get(p) === q) return root;

	let qBelowP = false;
	for (let node = parent.get(q); node; node = parent.get(node))
		if (node === p) qBelowP = true;

	const pParent = parent.get(p);
	let newRoot = root;
	if (qBelowP) {
		const qParent = parent.get(q);
		if (qParent)
			qParent.children = qParent.children.filter((child) => child !== q);
		if (pParent)
			pParent.children = pParent.children.map((child) =>
				child === p ? q : child,
			);
		else newRoot = q;
	} else if (pParent) {
		pParent.children = pParent.children.filter((child) => child !== p);
	}
	q.children.push(p);
	return newRoot;
};
