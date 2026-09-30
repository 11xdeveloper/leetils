import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { flipEquivalentBinaryTrees as flipEquiv } from ".";

const copy = (node: TreeNode | null): TreeNode | null =>
	node ? new TreeNode(node.val, copy(node.left), copy(node.right)) : null;

describe("951. Flip Equivalent Binary Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			flipEquiv(
				treeFromArray([1, 2, 3, 4, 5, 6, null, null, null, 7, 8]),
				treeFromArray([1, 3, 2, null, 6, 4, 5, null, null, null, null, 8, 7]),
			),
		).toBeTrue();
		expect(flipEquiv(treeFromArray([]), treeFromArray([]))).toBeTrue();
		expect(flipEquiv(treeFromArray([]), treeFromArray([1]))).toBeFalse();
	});

	it("recognises randomly flipped copies and rejects altered ones", () => {
		const random = createRandom(951);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 0);
			const nodes = nodesOf(root);
			for (const [i, node] of nodes.entries()) node.val = i;
			const flipped = copy(root);
			for (const node of nodesOf(flipped))
				if (random.int(0, 1)) [node.left, node.right] = [node.right, node.left];
			expect(flipEquiv(root, flipped)).toBeTrue();
			const altered = nodesOf(flipped);
			const victim = altered[random.int(0, Math.max(0, altered.length - 1))];
			if (victim && altered.length > 0) {
				victim.val = 100;
				expect(flipEquiv(root, flipped)).toBeFalse();
			}
		}
	});
});
