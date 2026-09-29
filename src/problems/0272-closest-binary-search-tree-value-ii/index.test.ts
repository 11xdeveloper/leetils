import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { closestBinarySearchTreeValueII as closest } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("272. Closest Binary Search Tree Value II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sorted(closest(treeFromArray([4, 2, 5, 1, 3]), 3.714286, 2)),
		).toEqual([3, 4]);
		expect(closest(treeFromArray([1]), 0, 1)).toEqual([1]);
	});

	it("returns every value when k is the size of the tree", () => {
		expect(sorted(closest(treeFromArray([4, 2, 5, 1, 3]), 100, 5))).toEqual([
			1, 2, 3, 4, 5,
		]);
	});

	it("matches sorting by distance on random trees with a unique answer", () => {
		const random = createRandom(272);
		for (let run = 0; run < 500; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), 0, 100));
			const values = inorderValues(root);
			// A target halfway between integers avoids ties with integer values.
			const target = random.int(-20, 220) / 2 + 0.25;
			const k = random.int(1, values.length);
			const byDistance = values.toSorted(
				(a, b) => Math.abs(a - target) - Math.abs(b - target),
			);
			expect(sorted(closest(root, target, k))).toEqual(
				sorted(byDistance.slice(0, k)),
			);
		}
	});
});
