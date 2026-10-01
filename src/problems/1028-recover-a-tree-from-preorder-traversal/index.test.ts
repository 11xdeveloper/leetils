import { describe, expect, it } from "bun:test";
import { TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { recoverATreeFromPreorderTraversal as recoverFromPreorder } from ".";

const write = (node: TreeNode | null, depth = 0): string =>
	node
		? `${"-".repeat(depth)}${node.val}${write(node.left, depth + 1)}${write(node.right, depth + 1)}`
		: "";

/** Moves a lone right child to the left, which is how the listing reads back. */
const normalise = (node: TreeNode | null): TreeNode | null => {
	if (!node) return null;
	const [left, right] = [normalise(node.left), normalise(node.right)];
	return left
		? new TreeNode(node.val, left, right)
		: new TreeNode(node.val, right);
};

describe("1028. Recover a Tree From Preorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(recoverFromPreorder("1-2--3--4-5--6--7"))).toEqual([
			1, 2, 5, 3, 4, 6, 7,
		]);
		expect(treeToArray(recoverFromPreorder("1-2--3---4-5--6---7"))).toEqual([
			1,
			2,
			5,
			3,
			null,
			6,
			null,
			4,
			null,
			7,
		]);
		expect(treeToArray(recoverFromPreorder("1-401--349---90--88"))).toEqual([
			1,
			401,
			null,
			349,
			88,
			90,
		]);
	});

	it("round-trips random trees", () => {
		const random = createRandom(1028);
		for (let run = 0; run < 500; run++) {
			const root = normalise(randomTree(random, 20, 1, 1000));
			expect(treeToArray(recoverFromPreorder(write(root)))).toEqual(
				treeToArray(root),
			);
		}
	});
});
