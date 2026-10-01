import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { BinarySearchTreeIterator } from ".";

describe("173. Binary Search Tree Iterator", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new BinarySearchTreeIterator(
			treeFromArray([7, 3, 15, null, null, 9, 20]),
		);
		expect(iterator.next()).toBe(3);
		expect(iterator.next()).toBe(7);
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe(9);
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe(15);
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe(20);
		expect(iterator.hasNext()).toBeFalse();
	});

	it("has nothing to iterate over for an empty tree", () => {
		expect(new BinarySearchTreeIterator(null).hasNext()).toBeFalse();
	});

	it("yields the inorder values of random binary search trees", () => {
		const random = createRandom(173);
		for (let run = 0; run < 300; run++) {
			const root = bstFromValues(random.array(random.int(0, 30), -50, 50));
			const iterator = new BinarySearchTreeIterator(root);
			const values: number[] = [];
			while (iterator.hasNext()) values.push(iterator.next());
			expect(values).toEqual(inorderValues(root));
		}
	});
});
