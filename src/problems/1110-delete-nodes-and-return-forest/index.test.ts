import { describe, expect, it } from "bun:test";
import {
	TreeNode,
	treeFromArray,
	treeToArray,
} from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { deleteNodesAndReturnForest as delNodes } from ".";

/** Rebuilds each surviving tree as a copy, starting from the survivors under deleted nodes. */
const byBruteForce = (
	root: TreeNode | null,
	toDelete: number[],
): (number | null)[][] => {
	const deleted = new Set(toDelete);
	const roots: TreeNode[] = [];
	const copy = (
		node: TreeNode | null,
		parentSurvives: boolean,
	): TreeNode | null => {
		if (!node) return null;
		const survives = !deleted.has(node.val);
		const left = copy(node.left, survives);
		const right = copy(node.right, survives);
		if (!survives) return null;
		const clone = new TreeNode(node.val, left, right);
		if (!parentSurvives) roots.push(clone);
		return clone;
	};
	copy(root, false);
	return roots.map(treeToArray).sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
};

const sorted = (roots: TreeNode[]) =>
	roots.map(treeToArray).sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));

describe("1110. Delete Nodes And Return Forest", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sorted(delNodes(treeFromArray([1, 2, 3, 4, 5, 6, 7]), [3, 5])),
		).toEqual([[1, 2, null, 4], [6], [7]]);
		expect(sorted(delNodes(treeFromArray([1, 2, 4, null, 3]), [3]))).toEqual([
			[1, 2, 4],
		]);
	});

	it("handles deleting everything or nothing", () => {
		expect(delNodes(treeFromArray([1, 2, 3]), [1, 2, 3])).toEqual([]);
		expect(sorted(delNodes(treeFromArray([1, 2, 3]), []))).toEqual([[1, 2, 3]]);
	});

	it("matches rebuilding the surviving trees on random inputs", () => {
		const random = createRandom(1110);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 15, 0, 0);
			nodesOf(root).forEach((node, i) => {
				node.val = i + 1;
			});
			const toDelete = nodesOf(root)
				.map((node) => node.val)
				.filter(() => random.next() < 0.3);
			const expected = byBruteForce(root, toDelete);
			expect(sorted(delNodes(root, toDelete))).toEqual(expected);
		}
	});
});
