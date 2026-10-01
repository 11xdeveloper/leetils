import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bstFromValues, nodesOf } from "../../testing/trees";
import { verifyPreorderSequenceInBinarySearchTree as verify } from ".";

/** A sequence of distinct values is a BST preorder exactly when inserting it reproduces it. */
const byRebuilding = (preorder: number[]): boolean =>
	nodesOf(bstFromValues(preorder))
		.map((node) => node.val)
		.join() === preorder.join();

describe("255. Verify Preorder Sequence in Binary Search Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(verify([5, 2, 1, 3, 6])).toBeTrue();
		expect(verify([5, 2, 6, 1, 3])).toBeFalse();
	});

	it("accepts trees that lean entirely one way", () => {
		expect(verify([1, 2, 3, 4])).toBeTrue();
		expect(verify([4, 3, 2, 1])).toBeTrue();
	});

	it("matches rebuilding the tree on every permutation of up to 7 values", () => {
		const permute = (values: number[]): number[][] =>
			values.length <= 1
				? [values]
				: values.flatMap((v, i) =>
						permute(values.toSpliced(i, 1)).map((rest) => [v, ...rest]),
					);
		for (let n = 1; n <= 7; n++) {
			for (const preorder of permute(
				Array.from({ length: n }, (_, i) => i + 1),
			)) {
				expect(verify(preorder)).toBe(byRebuilding(preorder));
			}
		}
	});

	it("accepts preorders of random binary search trees", () => {
		const random = createRandom(255);
		for (let run = 0; run < 300; run++) {
			const preorder = nodesOf(
				bstFromValues(random.array(random.int(1, 40), 1, 10_000)),
			).map((n) => n.val);
			expect(verify(preorder)).toBeTrue();
		}
	});
});
