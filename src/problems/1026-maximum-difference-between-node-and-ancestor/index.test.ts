import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { maximumDifferenceBetweenNodeAndAncestor as maxAncestorDiff } from ".";

describe("1026. Maximum Difference Between Node and Ancestor", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxAncestorDiff(
				treeFromArray([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]),
			),
		).toBe(7);
		expect(maxAncestorDiff(treeFromArray([1, null, 2, null, 0, 3]))).toBe(3);
	});

	it("matches comparing every node with its descendants on random trees", () => {
		const random = createRandom(1026);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, 0, 50);
			let expected = 0;
			for (const ancestor of nodesOf(root))
				for (const descendant of nodesOf(ancestor as TreeNode))
					expected = Math.max(
						expected,
						Math.abs(ancestor.val - descendant.val),
					);
			expect(maxAncestorDiff(root)).toBe(expected);
		}
	});
});
