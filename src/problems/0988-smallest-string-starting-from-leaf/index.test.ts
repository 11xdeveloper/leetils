import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { smallestStringStartingFromLeaf as smallestFromLeaf } from ".";

const leafStrings = (node: TreeNode | null, above = ""): string[] => {
	if (!node) return [];
	const text = String.fromCharCode(97 + node.val) + above;
	if (!node.left && !node.right) return [text];
	return [...leafStrings(node.left, text), ...leafStrings(node.right, text)];
};

describe("988. Smallest String Starting From Leaf", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestFromLeaf(treeFromArray([0, 1, 2, 3, 4, 3, 4]))).toBe("dba");
		expect(smallestFromLeaf(treeFromArray([25, 1, 3, 1, 3, 0, 2]))).toBe("adz");
		expect(
			smallestFromLeaf(treeFromArray([2, 2, 1, null, 1, 0, null, 0])),
		).toBe("abc");
	});

	it("matches listing every leaf string on random trees", () => {
		const random = createRandom(988);
		for (let run = 0; run < 500; run++) {
			const root = randomTree(random, 15, 0, 3);
			if (root)
				expect(smallestFromLeaf(root)).toBe(leafStrings(root).sort()[0] ?? "");
		}
	});
});
