import { describe, expect, it } from "bun:test";
import { TreeNode, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { maximumBinaryTree as constructMaximumBinaryTree } from ".";

const byRecursion = (nums: number[]): TreeNode | null => {
	if (nums.length === 0) return null;
	const max = Math.max(...nums);
	const at = nums.indexOf(max);
	return new TreeNode(
		max,
		byRecursion(nums.slice(0, at)),
		byRecursion(nums.slice(at + 1)),
	);
};

describe("654. Maximum Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]))).toEqual(
			[6, 3, 5, null, 2, 0, null, null, 1],
		);
		expect(treeToArray(constructMaximumBinaryTree([3, 2, 1]))).toEqual([
			3,
			null,
			2,
			null,
			1,
		]);
	});

	it("matches the recursive definition on random arrays", () => {
		const random = createRandom(654);
		for (let run = 0; run < 500; run++) {
			const nums = [...new Set(random.array(random.int(1, 20), 0, 100))];
			expect(treeToArray(constructMaximumBinaryTree(nums))).toEqual(
				treeToArray(byRecursion(nums)),
			);
		}
	});
});
