import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { deleteLeavesWithAGivenValue as removeLeafNodes } from ".";

/** Deletes one round of target leaves at a time, on a copy, until nothing changes. */
const byBruteForce = (
	root: TreeNode | null,
	target: number,
): (number | null)[] => {
	const copy = (node: TreeNode | null): TreeNode | null =>
		node ? new TreeNode(node.val, copy(node.left), copy(node.right)) : null;
	const prune = (node: TreeNode | null): TreeNode | null => {
		if (!node) return null;
		if (!node.left && !node.right && node.val === target) return null;
		node.left = prune(node.left);
		node.right = prune(node.right);
		return node;
	};
	let current = copy(root);
	for (let before = ""; before !== JSON.stringify(treeToArray(current)); ) {
		before = JSON.stringify(treeToArray(current));
		current = prune(current);
	}
	return treeToArray(current);
};

describe("1325. Delete Leaves With a Given Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(removeLeafNodes(treeFromArray([1, 2, 3, 2, null, 2, 4]), 2)),
		).toEqual([1, null, 3, null, 4]);
		expect(
			treeToArray(removeLeafNodes(treeFromArray([1, 3, 3, 3, 2]), 3)),
		).toEqual([1, 3, null, null, 2]);
		expect(
			treeToArray(removeLeafNodes(treeFromArray([1, 2, null, 2, null, 2]), 2)),
		).toEqual([1]);
	});

	it("can delete the whole tree", () => {
		expect(removeLeafNodes(treeFromArray([2, 2, 2]), 2)).toBeNull();
	});

	it("matches deleting leaves round by round on random trees", () => {
		const random = createRandom(1325);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 15, 1, 3);
			const expected = byBruteForce(root, 2);
			expect(treeToArray(removeLeafNodes(root, 2))).toEqual(expected);
		}
	});
});
