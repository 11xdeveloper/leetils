import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { kthSmallestElementInABst } from ".";

describe("230. Kth Smallest Element in a BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthSmallestElementInABst(treeFromArray([3, 1, 4, null, 2]), 1)).toBe(
			1,
		);
		expect(
			kthSmallestElementInABst(
				treeFromArray([5, 3, 6, 2, 4, null, null, 1]),
				3,
			),
		).toBe(3);
	});

	it("matches the sorted values for every k on random binary search trees", () => {
		const random = createRandom(230);
		for (let run = 0; run < 200; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), 0, 100));
			const sorted = inorderValues(root);
			for (let k = 1; k <= sorted.length; k++) {
				expect(kthSmallestElementInABst(root, k)).toBe(sorted[k - 1] ?? 0);
			}
		}
	});
});
