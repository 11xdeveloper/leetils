import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { mostFrequentSubtreeSum as findFrequentTreeSum } from ".";

const subtreeSum = (node: TreeNode | null): number =>
	node ? node.val + subtreeSum(node.left) + subtreeSum(node.right) : 0;

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("508. Most Frequent Subtree Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(findFrequentTreeSum(treeFromArray([5, 2, -3])))).toEqual([
			-3, 2, 4,
		]);
		expect(findFrequentTreeSum(treeFromArray([5, 2, -5]))).toEqual([2]);
	});

	it("matches summing every subtree on random trees", () => {
		const random = createRandom(508);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, -3, 3);
			const counts = new Map<number, number>();
			for (const node of nodesOf(root))
				counts.set(subtreeSum(node), (counts.get(subtreeSum(node)) ?? 0) + 1);
			const most = Math.max(0, ...counts.values());
			const expected = [...counts]
				.filter(([, count]) => count === most)
				.map(([sum]) => sum);
			expect(sorted(findFrequentTreeSum(root))).toEqual(sorted(expected));
		}
	});
});
