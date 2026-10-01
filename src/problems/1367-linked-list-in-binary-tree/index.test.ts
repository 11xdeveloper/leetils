import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { linkedListInBinaryTree as isSubPath } from ".";

/** Tries matching the list downwards from every node. */
const byBruteForce = (values: number[], root: TreeNode | null): boolean => {
	const matchFrom = (node: TreeNode | null, i: number): boolean => {
		if (i === values.length) return true;
		if (!node || node.val !== values[i]) return false;
		return matchFrom(node.left, i + 1) || matchFrom(node.right, i + 1);
	};
	return nodesOf(root).some((node) => matchFrom(node, 0));
};

describe("1367. Linked List in Binary Tree", () => {
	const tree = [
		1,
		4,
		4,
		null,
		2,
		2,
		null,
		1,
		null,
		6,
		8,
		null,
		null,
		null,
		null,
		1,
		3,
	];

	it("solves the examples from the problem statement", () => {
		expect(isSubPath(listFromArray([4, 2, 8]), treeFromArray(tree))).toBeTrue();
		expect(
			isSubPath(listFromArray([1, 4, 2, 6]), treeFromArray(tree)),
		).toBeTrue();
		expect(
			isSubPath(listFromArray([1, 4, 2, 6, 8]), treeFromArray(tree)),
		).toBeFalse();
	});

	it("restarts partial matches correctly", () => {
		// The path 1 → 1 → 2 contains 1 → 2 after a false start.
		expect(
			isSubPath(
				listFromArray([1, 1, 2]),
				treeFromArray([1, 1, null, 1, null, 2]),
			),
		).toBeTrue();
	});

	it("matches trying every starting node on random trees", () => {
		const random = createRandom(1367);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 1, 2);
			const values = random.array(random.int(1, 4), 1, 2);
			expect(isSubPath(listFromArray(values), root)).toBe(
				byBruteForce(values, root),
			);
		}
	});
});
