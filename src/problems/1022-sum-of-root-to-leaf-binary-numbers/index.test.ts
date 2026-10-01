import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { sumOfRootToLeafBinaryNumbers as sumRootToLeaf } from ".";

const paths = (node: TreeNode | null, prefix = ""): string[] => {
	if (!node) return [];
	const bits = prefix + node.val;
	if (!node.left && !node.right) return [bits];
	return [...paths(node.left, bits), ...paths(node.right, bits)];
};

describe("1022. Sum of Root To Leaf Binary Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumRootToLeaf(treeFromArray([1, 0, 1, 0, 1, 0, 1]))).toBe(22);
		expect(sumRootToLeaf(treeFromArray([0]))).toBe(0);
	});

	it("matches parsing every path on random trees", () => {
		const random = createRandom(1022);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 1);
			expect(sumRootToLeaf(root)).toBe(
				paths(root).reduce(
					(total, bits) => total + Number.parseInt(bits, 2),
					0,
				),
			);
		}
	});
});
