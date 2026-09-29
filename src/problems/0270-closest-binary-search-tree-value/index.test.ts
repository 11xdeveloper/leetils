import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { closestBinarySearchTreeValue as closest } from ".";

describe("270. Closest Binary Search Tree Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(closest(treeFromArray([4, 2, 5, 1, 3]), 3.714286)).toBe(4);
		expect(closest(treeFromArray([1]), 4.428571)).toBe(1);
	});

	it("returns the smaller value on a tie", () => {
		expect(closest(treeFromArray([4, 2, 5, 1, 3]), 3.5)).toBe(3);
		expect(closest(treeFromArray([2, 1, 3]), 2.5)).toBe(2);
	});

	it("matches checking every value on random binary search trees", () => {
		const random = createRandom(270);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), 0, 100));
			const values = inorderValues(root);
			const target = random.int(-20, 240) / 2;
			const expected = values.reduce((best, v) =>
				Math.abs(v - target) < Math.abs(best - target) ? v : best,
			);
			expect(closest(root, target)).toBe(expected);
		}
	});
});
