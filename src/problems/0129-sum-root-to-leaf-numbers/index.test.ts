import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { sumRootToLeafNumbers } from ".";

/** Spells every root-to-leaf number as a string. */
const leafNumbers = (node: TreeNode | null, prefix = ""): string[] => {
	if (!node) return [];
	const digits = prefix + node.val;
	if (!node.left && !node.right) return [digits];
	return [
		...leafNumbers(node.left, digits),
		...leafNumbers(node.right, digits),
	];
};

describe("129. Sum Root to Leaf Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumRootToLeafNumbers(treeFromArray([1, 2, 3]))).toBe(25);
		expect(sumRootToLeafNumbers(treeFromArray([4, 9, 0, 5, 1]))).toBe(1026);
	});

	it("keeps zeros in the middle of a number", () => {
		expect(sumRootToLeafNumbers(treeFromArray([1, 0, null, 5]))).toBe(105);
	});

	it("matches spelling every number on random trees", () => {
		const random = createRandom(129);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 12, 0, 9);
			expect(sumRootToLeafNumbers(root)).toBe(
				leafNumbers(root).reduce((sum, digits) => sum + Number(digits), 0),
			);
		}
	});
});
