import { describe, expect, it } from "bun:test";
import {
	type TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { correctABinaryTree as correctBinaryTree } from ".";

const find = (root: TreeNode | null, val: number): TreeNode => {
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val === val) return node;
		if (node.left) stack.push(node.left);
		if (node.right) stack.push(node.right);
	}
	throw new Error(`No node with value ${val}`);
};

/** Parses the tree and points `from`'s right child at `to`. */
const withDefect = (
	values: (number | null)[],
	from: number,
	to: number,
): TreeNode | null => {
	const root = treeFromArray(values);
	find(root, from).right = find(root, to);
	return root;
};

/** The levels of a tree, left to right. */
const levelsOf = (root: TreeNode | null): TreeNode[][] => {
	const levels: TreeNode[][] = [];
	for (
		let level = root ? [root] : [];
		level.length > 0;
		level = level.flatMap((n) => [n.left, n.right].filter((c) => c !== null))
	) {
		levels.push(level);
	}
	return levels;
};

describe("1660. Correct a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(correctBinaryTree(withDefect([1, 2, 3], 2, 3)))).toEqual(
			[1, null, 3],
		);
		expect(
			treeToArray(
				correctBinaryTree(
					withDefect([8, 3, 1, 7, null, 9, 4, 2, null, null, null, 5, 6], 7, 4),
				),
			),
		).toEqual([8, 3, 1, null, null, 9, 4, null, null, 5, 6]);
	});

	it("matches removing the chosen node on random trees", () => {
		const random = createRandom(1660);
		let checked = 0;
		while (checked < 200) {
			const values: (number | null)[] = [0];
			for (let i = 1; i < 25; i++)
				values.push(random.int(0, 3) === 0 ? null : i);
			const root = treeFromArray(values);
			const candidates = levelsOf(root).flatMap((level) =>
				level.flatMap((from, i) =>
					from.right ? [] : level.slice(i + 1).map((to) => [from, to] as const),
				),
			);
			const pair = candidates[random.int(0, candidates.length - 1)];
			if (!pair) continue;
			checked++;
			const [from, to] = pair;
			const expected = treeFromArray(treeToArray(root));
			const parentOfFrom = levelsOf(expected)
				.flat()
				.find((n) => n.left?.val === from.val || n.right?.val === from.val);
			if (parentOfFrom?.left?.val === from.val) parentOfFrom.left = null;
			else if (parentOfFrom) parentOfFrom.right = null;
			from.right = to;
			expect(treeToArray(correctBinaryTree(root))).toEqual(
				treeToArray(expected),
			);
		}
	});
});
