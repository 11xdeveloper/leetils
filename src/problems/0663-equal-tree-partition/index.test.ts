import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { equalTreePartition as checkEqualTree } from ".";

const sum = (node: TreeNode | null): number =>
	node ? node.val + sum(node.left) + sum(node.right) : 0;

describe("663. Equal Tree Partition", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkEqualTree(treeFromArray([5, 10, 10, null, null, 2, 3])),
		).toBeTrue();
		expect(
			checkEqualTree(treeFromArray([1, 2, 10, null, null, 2, 20])),
		).toBeFalse();
	});

	it("needs an actual edge to cut when the total is 0", () => {
		expect(checkEqualTree(treeFromArray([0]))).toBeFalse();
		expect(checkEqualTree(treeFromArray([0, -1, 1]))).toBeFalse();
		expect(checkEqualTree(treeFromArray([0, 0]))).toBeTrue();
	});

	it("matches cutting above every node on random trees", () => {
		const random = createRandom(663);
		for (let run = 0; run < 1000; run++) {
			const root = randomTree(random, 12, -3, 3);
			if (!root) continue;
			const total = sum(root);
			const expected = nodesOf(root).some(
				(node) => node !== root && 2 * sum(node) === total,
			);
			expect(checkEqualTree(root)).toBe(expected);
		}
	});
});
