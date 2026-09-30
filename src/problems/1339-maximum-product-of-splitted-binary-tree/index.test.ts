import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { maximumProductOfSplittedBinaryTree as maxProduct } from ".";

/** Cuts above every node in turn, multiplying the two sums with BigInt. */
const byBruteForce = (root: TreeNode): number => {
	const sum = (node: TreeNode | null): number =>
		node ? node.val + sum(node.left) + sum(node.right) : 0;
	const total = sum(root);
	let best = 0n;
	for (const node of nodesOf(root)) {
		if (node === root) continue;
		const product = BigInt(sum(node)) * BigInt(total - sum(node));
		if (product > best) best = product;
	}
	return Number(best % 1_000_000_007n);
};

describe("1339. Maximum Product of Splitted Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct(treeFromArray([1, 2, 3, 4, 5, 6]))).toBe(110);
		expect(
			maxProduct(treeFromArray([1, null, 2, 3, 4, null, null, 5, 6])),
		).toBe(90);
	});

	it("maximises before reducing modulo 10^9 + 7", () => {
		// Two halves of 25000 · 10^4 each: the product 6.25 · 10^16 needs BigInt.
		const values = Array.from({ length: 50000 }, () => 10000);
		const chain = treeFromArray(values.flatMap((value) => [value, null]));
		expect(maxProduct(chain)).toBe(
			Number((250_000_000n * 250_000_000n) % 1_000_000_007n),
		);
	});

	it("matches cutting every edge on random trees", () => {
		const random = createRandom(1339);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 20, 1, 50);
			if (!root || (!root.left && !root.right)) continue;
			expect(maxProduct(root)).toBe(byBruteForce(root));
		}
	});
});
