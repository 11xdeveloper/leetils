import type { TreeNode } from "../../structures/tree-node";

/**
 * 863. All Nodes Distance K in Binary Tree
 *
 * Returns the values of all nodes exactly `k` edges from `target`, a node
 * of the binary tree, in any order (here, breadth-first order from the
 * target).
 *
 * Records every node's parent, then runs a breadth-first search from the
 * target through children and parents alike, `k` levels deep.
 *
 * @see https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const root = treeFromArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
 * allNodesDistanceKInBinaryTree(root, root?.left ?? null, 2); // [7, 4, 1]
 */
export const allNodesDistanceKInBinaryTree = (
	root: TreeNode | null,
	target: TreeNode | null,
	k: number,
): number[] => {
	const parent = new Map<TreeNode, TreeNode | null>();
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		for (const child of [node.left, node.right]) {
			if (!child) continue;
			parent.set(child, node);
			stack.push(child);
		}
	}

	const seen = new Set(target ? [target] : []);
	let level = target ? [target] : [];
	for (let distance = 0; distance < k && level.length > 0; distance++) {
		const next: TreeNode[] = [];
		for (const node of level) {
			for (const neighbour of [
				node.left,
				node.right,
				parent.get(node) ?? null,
			]) {
				if (neighbour && !seen.has(neighbour)) {
					seen.add(neighbour);
					next.push(neighbour);
				}
			}
		}
		level = next;
	}
	return level.map((node) => node.val);
};
