import { NaryTreeNode } from "../../structures/nary-tree-node";
import { TreeNode } from "../../structures/tree-node";

/**
 * 431. Encode N-ary Tree to Binary Tree
 *
 * Encodes an N-ary tree as a binary tree and decodes it back, without
 * keeping any state between calls. LeetCode names these methods on a
 * `Codec` class, as here.
 *
 * The left-child, right-sibling representation: each binary node's `left`
 * points to its first child, and its `right` to its next sibling. Both
 * directions walk the trees with a queue of matching node pairs, so deep
 * trees can't overflow the call stack.
 *
 * @see https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const codec = new EncodeNAryTreeToBinaryTree();
 * codec.decode(codec.encode(root)); // a copy of root
 */
export class EncodeNAryTreeToBinaryTree {
	encode(root: NaryTreeNode | null): TreeNode | null {
		if (!root) return null;
		const encoded = new TreeNode(root.val);
		const queue: [NaryTreeNode, TreeNode][] = [[root, encoded]];
		for (let head = 0; head < queue.length; head++) {
			const [node, binary] = queue[head] ?? [];
			if (!node || !binary) break;
			let previous: TreeNode | null = null;
			for (const child of node.children) {
				const encodedChild = new TreeNode(child.val);
				if (previous) previous.right = encodedChild;
				else binary.left = encodedChild;
				previous = encodedChild;
				queue.push([child, encodedChild]);
			}
		}
		return encoded;
	}

	decode(root: TreeNode | null): NaryTreeNode | null {
		if (!root) return null;
		const decoded = new NaryTreeNode(root.val);
		const queue: [TreeNode, NaryTreeNode][] = [[root, decoded]];
		for (let head = 0; head < queue.length; head++) {
			const [binary, node] = queue[head] ?? [];
			if (!binary || !node) break;
			for (let child = binary.left; child; child = child.right) {
				const decodedChild = new NaryTreeNode(child.val);
				node.children.push(decodedChild);
				queue.push([child, decodedChild]);
			}
		}
		return decoded;
	}
}
