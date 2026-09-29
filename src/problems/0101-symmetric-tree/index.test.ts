import { describe, expect, it } from "bun:test";
import { TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { symmetricTree } from ".";

const mirror = (node: TreeNode | null): TreeNode | null =>
	node && new TreeNode(node.val, mirror(node.right), mirror(node.left));

const equal = (a: TreeNode | null, b: TreeNode | null): boolean =>
	(!a && !b) ||
	(!!a &&
		!!b &&
		a.val === b.val &&
		equal(a.left, b.left) &&
		equal(a.right, b.right));

describe("101. Symmetric Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(symmetricTree(treeFromArray([1, 2, 2, 3, 4, 4, 3]))).toBeTrue();
		expect(
			symmetricTree(treeFromArray([1, 2, 2, null, 3, null, 3])),
		).toBeFalse();
	});

	it("treats a single node as symmetric", () => {
		expect(symmetricTree(treeFromArray([1]))).toBeTrue();
	});

	it("checks values as well as shape", () => {
		expect(symmetricTree(treeFromArray([1, 2, 3]))).toBeFalse();
	});

	it("accepts trees joined with their mirror image", () => {
		const random = createRandom(101);
		for (let run = 0; run < 200; run++) {
			const half = randomTree(random, 10, 0, 3);
			expect(symmetricTree(new TreeNode(0, half, mirror(half)))).toBeTrue();
		}
	});

	it("matches comparing with the mirror image on random trees", () => {
		const random = createRandom(1010);
		for (let run = 0; run < 1000; run++) {
			const root = randomTree(random, 7, 0, 1);
			expect(symmetricTree(root)).toBe(equal(root, mirror(root)));
		}
	});
});
