import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf } from "../../testing/trees";
import { searchInABinarySearchTree as searchBST } from ".";

describe("700. Search in a Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(treeToArray(searchBST(treeFromArray([4, 2, 7, 1, 3]), 2))).toEqual([
			2, 1, 3,
		]);
		expect(searchBST(treeFromArray([4, 2, 7, 1, 3]), 5)).toBeNull();
	});

	it("finds exactly the node holding the value on random trees", () => {
		const random = createRandom(700);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues(random.array(random.int(1, 20), 0, 30));
			const val = random.int(0, 30);
			expect(searchBST(root, val)).toBe(
				nodesOf(root).find((node) => node.val === val) ?? null,
			);
		}
	});
});
