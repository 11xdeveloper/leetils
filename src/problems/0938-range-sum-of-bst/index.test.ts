import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { rangeSumOfBst as rangeSumBST } from ".";

describe("938. Range Sum of BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(rangeSumBST(treeFromArray([10, 5, 15, 3, 7, null, 18]), 7, 15)).toBe(
			32,
		);
		expect(
			rangeSumBST(treeFromArray([10, 5, 15, 3, 7, 13, 18, 1, null, 6]), 6, 10),
		).toBe(23);
	});

	it("matches filtering the values on random trees", () => {
		const random = createRandom(938);
		for (let run = 0; run < 1000; run++) {
			const values = [...new Set(random.array(random.int(1, 20), 0, 50))];
			const low = random.int(0, 50);
			const high = random.int(low, 50);
			const expected = values
				.filter((v) => v >= low && v <= high)
				.reduce((a, b) => a + b, 0);
			expect(rangeSumBST(bstFromValues(values), low, high)).toBe(expected);
		}
	});
});
