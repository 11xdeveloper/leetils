import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { longestZigzagPathInABinaryTree as longestZigZag } from ".";

/** Walks the zigzag from every node in both starting directions. */
const byBruteForce = (root: TreeNode | null): number => {
	let longest = 0;
	for (const start of nodesOf(root)) {
		for (const firstLeft of [true, false]) {
			let [left, length] = [firstLeft, 0];
			for (
				let node = left ? start.left : start.right;
				node;
				node = left ? node.left : node.right
			) {
				length++;
				left = !left;
			}
			longest = Math.max(longest, length);
		}
	}
	return longest;
};

describe("1372. Longest ZigZag Path in a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestZigZag(
				treeFromArray([
					1,
					null,
					1,
					1,
					1,
					null,
					null,
					1,
					1,
					null,
					1,
					null,
					null,
					null,
					1,
				]),
			),
		).toBe(3);
		expect(
			longestZigZag(
				treeFromArray([1, 1, 1, null, 1, null, null, 1, 1, null, 1]),
			),
		).toBe(4);
		expect(longestZigZag(treeFromArray([1]))).toBe(0);
	});

	it("matches walking from every node on random trees", () => {
		const random = createRandom(1372);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 1, 1);
			expect(longestZigZag(root)).toBe(byBruteForce(root));
		}
	});
});
