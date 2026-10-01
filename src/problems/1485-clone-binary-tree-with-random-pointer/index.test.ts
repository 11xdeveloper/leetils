import { describe, expect, it } from "bun:test";
import {
	type TreeNodeWithRandom,
	treeWithRandomFromArray,
	treeWithRandomToArray,
} from "../../structures/tree-node-with-random";
import { createRandom } from "../../testing/random";
import { cloneBinaryTreeWithRandomPointer as copyRandomBinaryTree } from ".";

const nodesOf = (root: TreeNodeWithRandom | null): TreeNodeWithRandom[] =>
	root ? [root, ...nodesOf(root.left), ...nodesOf(root.right)] : [];

/** Checks the copy matches and shares no nodes with the original. */
const expectDeepCopy = (entries: ([number, number | null] | null)[]) => {
	const original = treeWithRandomFromArray(entries);
	const copy = copyRandomBinaryTree(original);
	expect(treeWithRandomToArray(copy)).toEqual(treeWithRandomToArray(original));
	const originals = new Set(nodesOf(original));
	for (const node of nodesOf(copy)) {
		expect(originals.has(node)).toBeFalse();
		if (node.random) expect(originals.has(node.random)).toBeFalse();
	}
};

describe("1485. Clone Binary Tree With Random Pointer", () => {
	it("solves the examples from the problem statement", () => {
		expectDeepCopy([[1, null], null, [4, 3], [7, 0]]);
		expectDeepCopy([[1, 4], null, [1, 0], null, [1, 5], [1, 5]]);
		expectDeepCopy([
			[1, 6],
			[2, 5],
			[3, 4],
			[4, 3],
			[5, 2],
			[6, 1],
			[7, 0],
		]);
	});

	it("copies an empty tree", () => {
		expect(copyRandomBinaryTree(null)).toBeNull();
	});

	it("deep-copies random trees", () => {
		const random = createRandom(1485);
		for (let run = 0; run < 100; run++) {
			const size = random.int(1, 15);
			// A complete tree of the given size, with random pointers to any node.
			const entries: ([number, number | null] | null)[] = Array.from(
				{ length: size },
				() => [
					random.int(1, 9),
					random.next() < 0.3 ? null : random.int(0, size - 1),
				],
			);
			expectDeepCopy(entries);
		}
	});
});
