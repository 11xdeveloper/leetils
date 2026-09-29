import {
	type NaryTreeNode,
	naryTreeFromArray,
	naryTreeToArray,
} from "../../structures/nary-tree-node";

/**
 * 428. Serialize and Deserialize N-ary Tree
 *
 * Converts an N-ary tree to a string and back again, without keeping any
 * state between calls. LeetCode names these methods on a `Codec` class, as
 * here.
 *
 * Uses LeetCode's level-order format, like `"[1,null,3,2,4,null,5,6]"`,
 * which is a JSON array: `naryTreeToArray` lists each node's children in
 * turn, ending each group with `null`, and `naryTreeFromArray` rebuilds the
 * tree. Neither direction recurses.
 *
 * @see https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * const codec = new SerializeAndDeserializeNAryTree();
 * codec.serialize(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])); // "[1,null,3,2,4,null,5,6]"
 */
export class SerializeAndDeserializeNAryTree {
	serialize(root: NaryTreeNode | null): string {
		return JSON.stringify(naryTreeToArray(root));
	}

	deserialize(data: string): NaryTreeNode | null {
		return naryTreeFromArray(JSON.parse(data) as (number | null)[]);
	}
}
