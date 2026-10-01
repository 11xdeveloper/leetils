import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { randomTree } from "../../testing/trees";
import { checkCompletenessOfABinaryTree as isCompleteTree } from ".";

describe("958. Check Completeness of a Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(isCompleteTree(treeFromArray([1, 2, 3, 4, 5, 6]))).toBeTrue();
		expect(isCompleteTree(treeFromArray([1, 2, 3, 4, 5, null, 7]))).toBeFalse();
	});

	it("matches checking the level-order array has no gaps on random trees", () => {
		const random = createRandom(958);
		for (let run = 0; run < 1000; run++) {
			const root = random.int(0, 1)
				? randomTree(random, 15, 0, 9)
				: treeFromArray(random.array(random.int(1, 15), 0, 9));
			// A level-order array without trailing nulls has no null inside exactly when the tree is complete.
			expect(isCompleteTree(root)).toBe(!treeToArray(root).includes(null));
		}
	});
});
