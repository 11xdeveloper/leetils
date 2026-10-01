import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { nodesOf, randomTree } from "../../testing/trees";
import { flipBinaryTreeToMatchPreorderTraversal as flipMatchVoyage } from ".";

const preorder = (node: TreeNode | null, flip: Set<number>): number[] => {
	if (!node) return [];
	const [first, second] = flip.has(node.val)
		? [node.right, node.left]
		: [node.left, node.right];
	return [node.val, ...preorder(first, flip), ...preorder(second, flip)];
};

describe("971. Flip Binary Tree To Match Preorder Traversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(flipMatchVoyage(treeFromArray([1, 2]), [2, 1])).toEqual([-1]);
		expect(flipMatchVoyage(treeFromArray([1, 2, 3]), [1, 3, 2])).toEqual([1]);
		expect(flipMatchVoyage(treeFromArray([1, 2, 3]), [1, 2, 3])).toEqual([]);
	});

	it("matches the fewest flips over every set of flips on random trees", () => {
		const random = createRandom(971);
		for (let run = 0; run < 300; run++) {
			const root = randomTree(random, 8, 0, 0);
			const nodes = nodesOf(root);
			for (const [i, node] of nodes.entries()) node.val = i + 1;
			const voyage = random.int(0, 1)
				? preorder(
						root,
						new Set(nodes.filter(() => random.int(0, 1)).map((n) => n.val)),
					)
				: nodes.map((n) => n.val).sort(() => random.next() - 0.5);
			let best: number[] | undefined;
			for (let mask = 0; mask < 1 << nodes.length; mask++) {
				const flip = new Set(
					nodes.filter((_, i) => mask & (1 << i)).map((n) => n.val),
				);
				if (
					preorder(root, flip).join() === voyage.join() &&
					(!best || flip.size < best.length)
				)
					best = [...flip];
			}
			const result = flipMatchVoyage(root, voyage);
			if (!best) expect(result).toEqual([-1]);
			else {
				expect(result).toHaveLength(best.length);
				expect(preorder(root, new Set(result)).join()).toBe(voyage.join());
			}
		}
	});
});
