import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { checkIfAStringIsAValidSequenceFromRootToLeavesPathInABinaryTree as isValidSequence } from ".";

/** Lists every root-to-leaf path. */
const paths = (node: TreeNode | null): number[][] => {
	if (!node) return [];
	if (!node.left && !node.right) return [[node.val]];
	return [...paths(node.left), ...paths(node.right)].map((path) => [
		node.val,
		...path,
	]);
};

describe("1430. Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree", () => {
	const tree = [0, 1, 0, 0, 1, 0, null, null, 1, 0, 0];

	it("solves the examples from the problem statement", () => {
		expect(isValidSequence(treeFromArray(tree), [0, 1, 0, 1])).toBeTrue();
		expect(isValidSequence(treeFromArray(tree), [0, 0, 1])).toBeFalse();
		expect(isValidSequence(treeFromArray(tree), [0, 1, 1])).toBeFalse();
	});

	it("matches listing every path on random trees", () => {
		const random = createRandom(1430);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 12, 0, 1);
			const arr = random.array(random.int(1, 5), 0, 1);
			const expected = paths(root).some((path) => path.join() === arr.join());
			expect(isValidSequence(root, arr)).toBe(expected);
		}
	});
});
