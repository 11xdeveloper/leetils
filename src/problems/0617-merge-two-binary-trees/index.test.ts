import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { mergeTwoBinaryTrees as mergeTrees } from ".";

const byRecursion = (
	a: TreeNode | null,
	b: TreeNode | null,
): TreeNode | null =>
	a || b
		? new TreeNode(
				(a?.val ?? 0) + (b?.val ?? 0),
				byRecursion(a?.left ?? null, b?.left ?? null),
				byRecursion(a?.right ?? null, b?.right ?? null),
			)
		: null;

describe("617. Merge Two Binary Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				mergeTrees(
					treeFromArray([1, 3, 2, 5]),
					treeFromArray([2, 1, 3, null, 4, null, 7]),
				),
			),
		).toEqual([3, 4, 5, 5, 4, null, 7]);
		expect(
			treeToArray(mergeTrees(treeFromArray([1]), treeFromArray([1, 2]))),
		).toEqual([2, 2]);
	});

	it("matches recursion on random trees and leaves the inputs unchanged", () => {
		const random = createRandom(617);
		for (let run = 0; run < 500; run++) {
			const a = randomTree(random, 15, -9, 9);
			const b = randomTree(random, 15, -9, 9);
			const before = [treeToArray(a), treeToArray(b)];
			expect(treeToArray(mergeTrees(a, b))).toEqual(
				treeToArray(byRecursion(a, b)),
			);
			expect([treeToArray(a), treeToArray(b)]).toEqual(before);
		}
	});
});
