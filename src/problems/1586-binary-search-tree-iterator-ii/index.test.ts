import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { BinarySearchTreeIteratorII as BSTIterator } from ".";

describe("1586. Binary Search Tree Iterator II", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new BSTIterator(
			treeFromArray([7, 3, 15, null, null, 9, 20]),
		);
		expect(iterator.next()).toBe(3);
		expect(iterator.next()).toBe(7);
		expect(iterator.prev()).toBe(3);
		expect(iterator.next()).toBe(7);
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe(9);
		expect(iterator.next()).toBe(15);
		expect(iterator.next()).toBe(20);
		expect(iterator.hasNext()).toBeFalse();
		expect(iterator.hasPrev()).toBeTrue();
		expect(iterator.prev()).toBe(15);
		expect(iterator.prev()).toBe(9);
	});

	it("matches an index into the sorted values on random walks", () => {
		const random = createRandom(1586);
		for (let run = 0; run < 100; run++) {
			const values = [...new Set(random.array(random.int(1, 15), 0, 50))];
			const sorted = values.toSorted((a, b) => a - b);
			const iterator = new BSTIterator(bstFromValues(values));
			let index = -1;
			for (let step = 0; step < 40; step++) {
				expect(iterator.hasNext()).toBe(index + 1 < sorted.length);
				expect(iterator.hasPrev()).toBe(index > 0);
				if (index + 1 < sorted.length && (index <= 0 || random.next() < 0.6)) {
					index++;
					expect(iterator.next()).toBe(sorted[index] ?? -1);
				} else if (index > 0) {
					index--;
					expect(iterator.prev()).toBe(sorted[index] ?? -1);
				}
			}
		}
	});
});
