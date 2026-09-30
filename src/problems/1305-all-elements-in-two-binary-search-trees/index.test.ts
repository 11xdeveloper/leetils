import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { allElementsInTwoBinarySearchTrees as getAllElements } from ".";

describe("1305. All Elements in Two Binary Search Trees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getAllElements(treeFromArray([2, 1, 4]), treeFromArray([1, 0, 3])),
		).toEqual([0, 1, 1, 2, 3, 4]);
		expect(
			getAllElements(treeFromArray([1, null, 8]), treeFromArray([8, 1])),
		).toEqual([1, 1, 8, 8]);
	});

	it("handles empty trees", () => {
		expect(getAllElements(null, null)).toEqual([]);
		expect(getAllElements(null, treeFromArray([2, 1]))).toEqual([1, 2]);
	});

	it("matches sorting both value lists on random trees", () => {
		const random = createRandom(1305);
		for (let run = 0; run < 300; run++) {
			const a = [...new Set(random.array(random.int(0, 10), -20, 20))];
			const b = [...new Set(random.array(random.int(0, 10), -20, 20))];
			expect(getAllElements(bstFromValues(a), bstFromValues(b))).toEqual(
				[...a, ...b].sort((x, y) => x - y),
			);
		}
	});
});
