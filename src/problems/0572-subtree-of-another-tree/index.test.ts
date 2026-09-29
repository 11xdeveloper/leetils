import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { subtreeOfAnotherTree as isSubtree } from ".";

const same = (a: TreeNode | null, b: TreeNode | null): boolean =>
	a === null || b === null
		? a === b
		: a.val === b.val && same(a.left, b.left) && same(a.right, b.right);

describe("572. Subtree of Another Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isSubtree(treeFromArray([3, 4, 5, 1, 2]), treeFromArray([4, 1, 2])),
		).toBeTrue();
		expect(
			isSubtree(
				treeFromArray([3, 4, 5, 1, 2, null, null, null, null, 0]),
				treeFromArray([4, 1, 2]),
			),
		).toBeFalse();
	});

	it("doesn't confuse values that share digits", () => {
		expect(isSubtree(treeFromArray([12]), treeFromArray([2]))).toBeFalse();
		expect(isSubtree(treeFromArray([1, 12]), treeFromArray([2]))).toBeFalse();
	});

	it("matches comparing with every subtree on random trees", () => {
		const random = createRandom(572);
		for (let run = 0; run < 1000; run++) {
			const root = randomTree(random, 15, 0, 2);
			const sub =
				random.int(0, 1) === 0
					? randomTree(random, 4, 0, 2)
					: random.int(0, 1)
						? (nodesOf(root)[0] ?? null)
						: null;
			if (!root || !sub) continue;
			expect(isSubtree(root, sub)).toBe(
				nodesOf(root).some((node) => same(node, sub)),
			);
		}
	});
});
