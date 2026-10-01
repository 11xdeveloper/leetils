import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { pathSum } from ".";

/** Every root-to-leaf sum. */
const leafSums = (node: TreeNode | null, sum = 0): number[] => {
	if (!node) return [];
	const total = sum + node.val;
	if (!node.left && !node.right) return [total];
	return [...leafSums(node.left, total), ...leafSums(node.right, total)];
};

describe("112. Path Sum", () => {
	it("solves the examples from the problem statement", () => {
		const tree = treeFromArray([
			5,
			4,
			8,
			11,
			null,
			13,
			4,
			7,
			2,
			null,
			null,
			null,
			1,
		]);
		expect(pathSum(tree, 22)).toBeTrue();
		expect(pathSum(treeFromArray([1, 2, 3]), 5)).toBeFalse();
		expect(pathSum(null, 0)).toBeFalse();
	});

	it("only counts paths that end at a leaf", () => {
		expect(pathSum(treeFromArray([1, 2]), 1)).toBeFalse();
	});

	it("handles negative values", () => {
		expect(pathSum(treeFromArray([-2, null, -3]), -5)).toBeTrue();
	});

	it("matches listing every root-to-leaf sum on random trees", () => {
		const random = createRandom(112);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, -5, 5);
			const target = random.int(-10, 10);
			expect(pathSum(root, target)).toBe(leafSums(root).includes(target));
		}
	});
});
