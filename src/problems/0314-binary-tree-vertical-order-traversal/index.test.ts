import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { binaryTreeVerticalOrderTraversal as vertical } from ".";

/** Records every node's row, column and left-to-right position, then sorts. */
const bySorting = (root: TreeNode | null): number[][] => {
	const entries: [column: number, row: number, order: number, value: number][] =
		[];
	let order = 0;
	let level: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let row = 0; level.length > 0; row++) {
		for (const [node, column] of level)
			entries.push([column, row, order++, node.val]);
		level = level.flatMap(([node, column]) => [
			...(node.left ? [[node.left, column - 1] as [TreeNode, number]] : []),
			...(node.right ? [[node.right, column + 1] as [TreeNode, number]] : []),
		]);
	}
	entries.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
	const columns = new Map<number, number[]>();
	for (const [column, , , value] of entries)
		columns.set(column, [...(columns.get(column) ?? []), value]);
	return [...columns.values()];
};

describe("314. Binary Tree Vertical Order Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(vertical(treeFromArray([3, 9, 20, null, null, 15, 7]))).toEqual([
			[9],
			[3, 15],
			[20],
			[7],
		]);
		expect(vertical(treeFromArray([3, 9, 8, 4, 0, 1, 7]))).toEqual([
			[4],
			[9],
			[3, 0, 1],
			[8],
			[7],
		]);
		expect(
			vertical(
				treeFromArray([
					1,
					2,
					3,
					4,
					10,
					9,
					11,
					null,
					5,
					null,
					null,
					null,
					null,
					null,
					null,
					null,
					6,
				]),
			),
		).toEqual([[4], [2, 5], [1, 10, 9, 6], [3], [11]]);
		expect(vertical(null)).toEqual([]);
	});

	it("matches sorting by column, row and position on random trees", () => {
		const random = createRandom(314);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 20, -100, 100);
			expect(vertical(root)).toEqual(bySorting(root));
		}
	});
});
