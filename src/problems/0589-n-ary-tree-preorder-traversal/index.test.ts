import { describe, expect, it } from "bun:test";
import {
	type NaryTreeNode,
	naryTreeFromArray,
} from "../../structures/nary-tree-node";
import { createRandom } from "../../testing/random";
import { nAryTreePreorderTraversal as preorder } from ".";

const byRecursion = (node: NaryTreeNode | null): number[] =>
	node
		? [node.val, ...node.children.flatMap((child) => byRecursion(child))]
		: [];

describe("589. N-ary Tree Preorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(preorder(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6]))).toEqual(
			[1, 3, 5, 6, 2, 4],
		);
		expect(
			preorder(
				naryTreeFromArray([
					1,
					null,
					2,
					3,
					4,
					5,
					null,
					null,
					6,
					7,
					null,
					8,
					null,
					9,
					10,
					null,
					null,
					11,
					null,
					12,
					null,
					13,
					null,
					null,
					14,
				]),
			),
		).toEqual([1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]);
		expect(preorder(null)).toEqual([]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(589);
		for (let run = 0; run < 300; run++) {
			const values: (number | null)[] = [random.int(0, 99), null];
			for (let i = random.int(0, 20); i > 0; i--)
				values.push(random.int(0, 3) === 0 ? null : random.int(0, 99));
			const root = naryTreeFromArray(values);
			expect(preorder(root)).toEqual(byRecursion(root));
		}
	});
});
