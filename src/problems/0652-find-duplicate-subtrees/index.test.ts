import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { findDuplicateSubtrees } from ".";

const shapes = (nodes: (TreeNode | null)[]): string[] =>
	nodes.map((node) => JSON.stringify(treeToArray(node))).sort();

describe("652. Find Duplicate Subtrees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shapes(
				findDuplicateSubtrees(
					treeFromArray([1, 2, 3, 4, null, 2, 4, null, null, 4]),
				),
			),
		).toEqual(shapes([treeFromArray([2, 4]), treeFromArray([4])]));
		expect(shapes(findDuplicateSubtrees(treeFromArray([2, 1, 1])))).toEqual(
			shapes([treeFromArray([1])]),
		);
		expect(
			shapes(findDuplicateSubtrees(treeFromArray([2, 2, 2, 3, null, 3, null]))),
		).toEqual(shapes([treeFromArray([2, 3]), treeFromArray([3])]));
	});

	it("matches comparing every pair of subtrees on random trees", () => {
		const random = createRandom(652);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 2);
			const all = nodesOf(root).map((node) =>
				JSON.stringify(treeToArray(node)),
			);
			const expected = [
				...new Set(all.filter((shape, i) => all.indexOf(shape) !== i)),
			].sort();
			expect(shapes(findDuplicateSubtrees(root))).toEqual(expected);
		}
	});
});
