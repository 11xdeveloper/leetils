import { TreeNode } from "../../structures/tree-node";

/**
 * 449. Serialize and Deserialize BST
 *
 * Converts a binary search tree to a compact string and back again.
 * LeetCode names these methods on a `Codec` class, as here.
 *
 * A binary search tree is determined by its preorder traversal alone, so
 * only the values are written, with no markers for missing children.
 * Rebuilding inserts each value under the right node using a stack of the
 * path so far, which runs in linear time without recursion.
 *
 * @see https://leetcode.com/problems/serialize-and-deserialize-bst/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const codec = new SerializeAndDeserializeBst();
 * codec.serialize(treeFromArray([2, 1, 3])); // "2,1,3"
 */
export class SerializeAndDeserializeBst {
	serialize(root: TreeNode | null): string {
		const values: number[] = [];
		const stack = root ? [root] : [];
		for (let node = stack.pop(); node; node = stack.pop()) {
			values.push(node.val);
			if (node.right) stack.push(node.right);
			if (node.left) stack.push(node.left);
		}
		return values.join(",");
	}

	deserialize(data: string): TreeNode | null {
		if (data === "") return null;
		const values = data.split(",").map(Number);
		const root = new TreeNode(values[0] ?? 0);
		const stack = [root];

		for (const value of values.slice(1)) {
			const node = new TreeNode(value);
			let parent = stack.at(-1) ?? root;
			if (value < parent.val) {
				parent.left = node;
			} else {
				// The parent is the last node on the path smaller than value.
				while (stack.length > 0 && (stack.at(-1)?.val ?? 0) < value)
					parent = stack.pop() ?? parent;
				parent.right = node;
			}
			stack.push(node);
		}

		return root;
	}
}
