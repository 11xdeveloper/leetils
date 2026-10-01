import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { findACorrespondingNodeOfABinaryTreeInACloneOfThatTree as getTargetCopy } from ".";

const clone = (node: TreeNode | null): TreeNode | null =>
	node ? new TreeNode(node.val, clone(node.left), clone(node.right)) : null;

describe("1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree", () => {
	it("solves the examples from the problem statement", () => {
		for (const [values, target] of [
			[[7, 4, 3, null, null, 6, 19], 3],
			[[7], 7],
			[[8, null, 6, null, 5, null, 4, null, 3, null, 2, null, 1], 4],
		] as const) {
			const original = treeFromArray([...values]);
			const copy = clone(original);
			const node = nodesOf(original).find((n) => n.val === target) ?? null;
			const found = getTargetCopy(original, copy, node);
			expect(found?.val).toBe(target);
			expect(nodesOf(copy)).toContain(found ?? new TreeNode(-1));
		}
	});

	it("finds the node by position when values repeat", () => {
		const random = createRandom(1379);
		for (let run = 0; run < 200; run++) {
			const original = randomTree(random, 15, 1, 2) ?? new TreeNode(1);
			const copy = clone(original);
			const originals = nodesOf(original);
			const index = random.int(0, originals.length - 1);
			expect(getTargetCopy(original, copy, originals[index] ?? null)).toBe(
				nodesOf(copy)[index] ?? null,
			);
		}
	});
});
