import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { increasingOrderSearchTree as increasingBST } from ".";

describe("897. Increasing Order Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				increasingBST(
					treeFromArray([5, 3, 6, 2, 4, null, 8, 1, null, null, null, 7, 9]),
				),
			),
		).toEqual([
			1,
			null,
			2,
			null,
			3,
			null,
			4,
			null,
			5,
			null,
			6,
			null,
			7,
			null,
			8,
			null,
			9,
		]);
		expect(treeToArray(increasingBST(treeFromArray([5, 1, 7])))).toEqual([
			1,
			null,
			5,
			null,
			7,
		]);
	});

	it("chains the values of random trees in order", () => {
		const random = createRandom(897);
		for (let run = 0; run < 500; run++) {
			const values = [...new Set(random.array(random.int(1, 20), 0, 50))];
			const chain: number[] = [];
			for (
				let node = increasingBST(bstFromValues(values));
				node;
				node = node.right
			) {
				expect(node.left).toBeNull();
				chain.push(node.val);
			}
			expect(chain).toEqual(values.toSorted((a, b) => a - b));
		}
	});
});
