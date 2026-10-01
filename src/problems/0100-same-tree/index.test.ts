import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { sameTree } from ".";

describe("100. Same Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sameTree(treeFromArray([1, 2, 3]), treeFromArray([1, 2, 3])),
		).toBeTrue();
		expect(
			sameTree(treeFromArray([1, 2]), treeFromArray([1, null, 2])),
		).toBeFalse();
		expect(
			sameTree(treeFromArray([1, 2, 1]), treeFromArray([1, 1, 2])),
		).toBeFalse();
	});

	it("handles empty trees", () => {
		expect(sameTree(null, null)).toBeTrue();
		expect(sameTree(treeFromArray([1]), null)).toBeFalse();
	});

	it("matches comparing level-order arrays on random trees", () => {
		const random = createRandom(100);
		for (let run = 0; run < 1000; run++) {
			const p = randomTree(random, 4, 0, 1);
			const q = randomTree(random, 4, 0, 1);
			expect(sameTree(p, q)).toBe(
				JSON.stringify(treeToArray(p)) === JSON.stringify(treeToArray(q)),
			);
		}
	});
});
