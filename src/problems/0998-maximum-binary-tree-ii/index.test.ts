import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { maximumBinaryTree } from "../0654-maximum-binary-tree";
import { maximumBinaryTreeII as insertIntoMaxTree } from ".";

describe("998. Maximum Binary Tree II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				insertIntoMaxTree(treeFromArray([4, 1, 3, null, null, 2]), 5),
			),
		).toEqual([5, 4, null, 1, 3, null, null, 2]);
		expect(
			treeToArray(insertIntoMaxTree(treeFromArray([5, 2, 4, null, 1]), 3)),
		).toEqual([5, 2, 4, null, 1, null, 3]);
		expect(
			treeToArray(insertIntoMaxTree(treeFromArray([5, 2, 3, null, 1]), 4)),
		).toEqual([5, 2, 4, null, 1, 3]);
	});

	it("matches rebuilding from the extended array on random arrays", () => {
		const random = createRandom(998);
		for (let run = 0; run < 500; run++) {
			const values = [...new Set(random.array(random.int(1, 15), 1, 100))];
			const val = values.pop() ?? 0;
			if (values.length === 0) continue;
			expect(
				treeToArray(insertIntoMaxTree(maximumBinaryTree(values), val)),
			).toEqual(treeToArray(maximumBinaryTree([...values, val])));
		}
	});
});
