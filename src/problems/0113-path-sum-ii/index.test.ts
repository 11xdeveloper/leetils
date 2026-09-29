import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { pathSumII } from ".";

/** Every root-to-leaf path, left to right. */
const leafPaths = (node: TreeNode | null): number[][] => {
	if (!node) return [];
	if (!node.left && !node.right) return [[node.val]];
	return [...leafPaths(node.left), ...leafPaths(node.right)].map((path) => [
		node.val,
		...path,
	]);
};

describe("113. Path Sum II", () => {
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
			5,
			1,
		]);
		expect(pathSumII(tree, 22)).toEqual([
			[5, 4, 11, 2],
			[5, 8, 4, 5],
		]);
		expect(pathSumII(treeFromArray([1, 2, 3]), 5)).toEqual([]);
		expect(pathSumII(treeFromArray([1, 2]), 0)).toEqual([]);
	});

	it("matches filtering every root-to-leaf path on random trees", () => {
		const random = createRandom(113);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, -3, 3);
			const target = random.int(-6, 6);
			expect(pathSumII(root, target)).toEqual(
				leafPaths(root).filter(
					(path) => path.reduce((a, b) => a + b, 0) === target,
				),
			);
		}
	});
});
