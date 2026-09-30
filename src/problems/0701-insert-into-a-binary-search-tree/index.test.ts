import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { insertIntoABinarySearchTree as insertIntoBST } from ".";

describe("701. Insert into a Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(insertIntoBST(treeFromArray([4, 2, 7, 1, 3]), 5)),
		).toEqual([4, 2, 7, 1, 3, 5]);
		expect(
			treeToArray(
				insertIntoBST(treeFromArray([40, 20, 60, 10, 30, 50, 70]), 25),
			),
		).toEqual([40, 20, 60, 10, 30, 50, 70, null, null, 25]);
		expect(treeToArray(insertIntoBST(null, 5))).toEqual([5]);
	});

	it("keeps random trees sorted after each insertion", () => {
		const random = createRandom(701);
		for (let run = 0; run < 300; run++) {
			const values = [...new Set(random.array(random.int(1, 30), 0, 100))];
			const [first = 0, ...rest] = values;
			let root = bstFromValues([first]);
			for (const value of rest) root = insertIntoBST(root, value);
			expect(inorderValues(root)).toEqual(values.toSorted((a, b) => a - b));
			expect(treeToArray(root)).toEqual(treeToArray(bstFromValues(values)));
		}
	});
});
