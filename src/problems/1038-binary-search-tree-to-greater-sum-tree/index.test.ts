import { describe, expect, it } from "bun:test";
import { treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { convertBstToGreaterTree } from "../0538-convert-bst-to-greater-tree";
import { binarySearchTreeToGreaterSumTree as bstToGst } from ".";

describe("1038. Binary Search Tree to Greater Sum Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(bstToGst(bstFromValues([4, 1, 6, 0, 2, 5, 7, 3, 8]))),
		).toEqual([
			30,
			36,
			21,
			36,
			35,
			26,
			15,
			null,
			null,
			null,
			33,
			null,
			null,
			null,
			8,
		]);
		expect(treeToArray(bstToGst(bstFromValues([0, 1])))).toEqual([1, null, 1]);
	});

	it("agrees with Convert BST to Greater Tree, the same problem", () => {
		const random = createRandom(1038);
		for (let run = 0; run < 300; run++) {
			const values = [...new Set(random.array(random.int(1, 20), 0, 100))];
			expect(treeToArray(bstToGst(bstFromValues(values)))).toEqual(
				treeToArray(convertBstToGreaterTree(bstFromValues(values))),
			);
		}
	});
});
