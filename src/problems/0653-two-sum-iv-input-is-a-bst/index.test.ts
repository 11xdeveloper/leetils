import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { twoSumIVInputIsABst as findTarget } from ".";

describe("653. Two Sum IV - Input is a BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTarget(treeFromArray([5, 3, 6, 2, 4, null, 7]), 9)).toBeTrue();
		expect(findTarget(treeFromArray([5, 3, 6, 2, 4, null, 7]), 28)).toBeFalse();
	});

	it("doesn't use one node twice", () => {
		expect(findTarget(treeFromArray([1]), 2)).toBeFalse();
	});

	it("matches checking every pair on random trees", () => {
		const random = createRandom(653);
		for (let run = 0; run < 1000; run++) {
			const values = [...new Set(random.array(random.int(1, 10), -10, 10))];
			const k = random.int(-20, 20);
			const expected = values.some((a, i) =>
				values.some((b, j) => i !== j && a + b === k),
			);
			expect(findTarget(bstFromValues(values), k)).toBe(expected);
		}
	});
});
