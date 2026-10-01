import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { convertBstToGreaterTree as convertBST } from ".";

describe("538. Convert BST to Greater Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			treeToArray(
				convertBST(
					treeFromArray([
						4,
						1,
						6,
						0,
						2,
						5,
						7,
						null,
						null,
						null,
						3,
						null,
						null,
						null,
						8,
					]),
				),
			),
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
		expect(treeToArray(convertBST(treeFromArray([0, null, 1])))).toEqual([
			1,
			null,
			1,
		]);
		expect(convertBST(null)).toBeNull();
	});

	it("replaces each value with the sum of those at least as large on random trees", () => {
		const random = createRandom(538);
		for (let run = 0; run < 500; run++) {
			const values = [...new Set(random.array(random.int(1, 25), -50, 50))];
			const sorted = values.toSorted((a, b) => a - b);
			const expected = sorted.map((value) =>
				sorted.filter((other) => other >= value).reduce((sum, v) => sum + v, 0),
			);
			expect(inorderValues(convertBST(bstFromValues(values)))).toEqual(
				expected,
			);
		}
	});
});
