import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { minimumAbsoluteDifferenceInBst as getMinimumDifference } from ".";

describe("530. Minimum Absolute Difference in BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMinimumDifference(treeFromArray([4, 2, 6, 1, 3]))).toBe(1);
		expect(
			getMinimumDifference(treeFromArray([1, 0, 48, null, null, 12, 49])),
		).toBe(1);
	});

	it("matches comparing every pair on random trees", () => {
		const random = createRandom(530);
		for (let run = 0; run < 500; run++) {
			const values = [...new Set(random.array(random.int(2, 20), 0, 1000))];
			if (values.length < 2) continue;
			let expected = Number.POSITIVE_INFINITY;
			for (const a of values)
				for (const b of values)
					if (a !== b) expected = Math.min(expected, Math.abs(a - b));
			expect(getMinimumDifference(bstFromValues(values))).toBe(expected);
		}
	});

	it("handles a very deep tree", () => {
		const values = Array.from({ length: 10_000 }, (_, i) => i * 3);
		expect(getMinimumDifference(bstFromValues(values))).toBe(3);
	});
});
