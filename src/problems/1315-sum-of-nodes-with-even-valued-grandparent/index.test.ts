import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { sumOfNodesWithEvenValuedGrandparent as sumEvenGrandparent } from ".";

/** Adds up the grandchildren of every even node. */
const byBruteForce = (root: TreeNode | null): number =>
	nodesOf(root)
		.filter((node) => node.val % 2 === 0)
		.flatMap((node) => [node.left, node.right])
		.flatMap((child) => [child?.left, child?.right])
		.reduce((sum, grandchild) => sum + (grandchild?.val ?? 0), 0);

describe("1315. Sum of Nodes with Even-Valued Grandparent", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumEvenGrandparent(
				treeFromArray([
					6,
					7,
					8,
					2,
					7,
					1,
					3,
					9,
					null,
					1,
					4,
					null,
					null,
					null,
					5,
				]),
			),
		).toBe(18);
		expect(sumEvenGrandparent(treeFromArray([1]))).toBe(0);
	});

	it("matches adding up grandchildren on random trees", () => {
		const random = createRandom(1315);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 25, 1, 100);
			expect(sumEvenGrandparent(root)).toBe(byBruteForce(root));
		}
	});
});
