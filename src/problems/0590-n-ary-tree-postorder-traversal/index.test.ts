import { describe, expect, it } from "bun:test";
import {
	type NaryTreeNode,
	naryTreeFromArray,
} from "../../structures/nary-tree-node";
import { createRandom } from "../../testing/random";
import { nAryTreePostorderTraversal as postorder } from ".";

const byRecursion = (node: NaryTreeNode | null): number[] =>
	node
		? [...node.children.flatMap((child) => byRecursion(child)), node.val]
		: [];

describe("590. N-ary Tree Postorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			postorder(naryTreeFromArray([1, null, 3, 2, 4, null, 5, 6])),
		).toEqual([5, 6, 3, 2, 4, 1]);
		expect(
			postorder(
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
		).toEqual([2, 6, 14, 11, 7, 3, 12, 8, 4, 13, 9, 10, 5, 1]);
		expect(postorder(null)).toEqual([]);
	});

	it("matches recursion on random trees", () => {
		const random = createRandom(590);
		for (let run = 0; run < 300; run++) {
			const values: (number | null)[] = [random.int(0, 99), null];
			for (let i = random.int(0, 20); i > 0; i--)
				values.push(random.int(0, 3) === 0 ? null : random.int(0, 99));
			const root = naryTreeFromArray(values);
			expect(postorder(root)).toEqual(byRecursion(root));
		}
	});
});
