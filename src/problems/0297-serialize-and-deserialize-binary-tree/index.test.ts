import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { SerializeAndDeserializeBinaryTree } from ".";

const roundTrip = (root: TreeNode | null): TreeNode | null => {
	const sender = new SerializeAndDeserializeBinaryTree();
	const receiver = new SerializeAndDeserializeBinaryTree();
	return receiver.deserialize(sender.serialize(root));
};

describe("297. Serialize and Deserialize Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(roundTrip(treeFromArray([1, 2, 3, null, null, 4, 5]))),
		).toEqual([1, 2, 3, null, null, 4, 5]);
		expect(roundTrip(null)).toBeNull();
	});

	it("writes LeetCode's level-order format", () => {
		const codec = new SerializeAndDeserializeBinaryTree();
		expect(codec.serialize(treeFromArray([1, 2, 3, null, null, 4, 5]))).toBe(
			"[1,2,3,null,null,4,5]",
		);
		expect(codec.serialize(null)).toBe("[]");
	});

	it("handles a tree too deep for recursion", () => {
		let root: TreeNode | null = null;
		for (let i = 0; i < 10_000; i++)
			root = new TreeNode((i % 2000) - 1000, root);
		expect(treeToArray(roundTrip(root))).toEqual(treeToArray(root));
	});

	it("round-trips random trees", () => {
		const random = createRandom(297);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 30, -1000, 1000);
			expect(treeToArray(roundTrip(root))).toEqual(treeToArray(root));
		}
	});
});
