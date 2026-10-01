import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";

/**
 * 297. Serialize and Deserialize Binary Tree
 *
 * Converts a binary tree to a string and back again. LeetCode splits this
 * into two functions, `serialize` and `deserialize`; here they are methods
 * of one class, like the `Codec` class in LeetCode's other languages.
 *
 * Uses LeetCode's own level-order format, like `"[1,2,3,null,null,4,5]"`,
 * which is a JSON array: `treeToArray` lists the values breadth-first with
 * `null` for missing children, and `treeFromArray` rebuilds the tree.
 * Neither direction recurses, so deep trees are safe.
 *
 * @see https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const codec = new SerializeAndDeserializeBinaryTree();
 * codec.serialize(treeFromArray([1, 2, 3, null, null, 4, 5])); // "[1,2,3,null,null,4,5]"
 */
export class SerializeAndDeserializeBinaryTree {
	serialize(root: TreeNode | null): string {
		return JSON.stringify(treeToArray(root));
	}

	deserialize(data: string): TreeNode | null {
		return treeFromArray(JSON.parse(data) as (number | null)[]);
	}
}
