import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { numberOfGoodLeafNodesPairs as countPairs } from ".";

/** Measures the distance between every pair of leaves through their paths from the root. */
const byBruteForce = (root: TreeNode | null, distance: number): number => {
	const paths = new Map<TreeNode, TreeNode[]>();
	const visit = (node: TreeNode | null, path: TreeNode[]): void => {
		if (!node) return;
		const here = [...path, node];
		paths.set(node, here);
		visit(node.left, here);
		visit(node.right, here);
	};
	visit(root, []);
	const leaves = nodesOf(root).filter((node) => !node.left && !node.right);
	let count = 0;
	for (let i = 0; i < leaves.length; i++) {
		for (let j = i + 1; j < leaves.length; j++) {
			const [a = [], b = []] = [
				paths.get(leaves[i] as TreeNode),
				paths.get(leaves[j] as TreeNode),
			];
			let common = 0;
			while (common < a.length && a[common] === b[common]) common++;
			if (a.length + b.length - 2 * common <= distance) count++;
		}
	}
	return count;
};

describe("1530. Number of Good Leaf Nodes Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs(treeFromArray([1, 2, 3, null, 4]), 3)).toBe(1);
		expect(countPairs(treeFromArray([1, 2, 3, 4, 5, 6, 7]), 3)).toBe(2);
		expect(
			countPairs(
				treeFromArray([
					7,
					1,
					4,
					6,
					null,
					5,
					3,
					null,
					null,
					null,
					null,
					null,
					2,
				]),
				3,
			),
		).toBe(1);
	});

	it("matches measuring every pair of leaves on random trees", () => {
		const random = createRandom(1530);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 1, 9);
			const distance = random.int(1, 10);
			expect(countPairs(root, distance)).toBe(byBruteForce(root, distance));
		}
	});
});
