import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { middleOfTheLinkedList as middleNode } from ".";

describe("876. Middle of the Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(listToArray(middleNode(listFromArray([1, 2, 3, 4, 5])))).toEqual([
			3, 4, 5,
		]);
		expect(listToArray(middleNode(listFromArray([1, 2, 3, 4, 5, 6])))).toEqual([
			4, 5, 6,
		]);
	});

	it("returns the node at index ⌊n / 2⌋ for every length up to 50", () => {
		for (let n = 1; n <= 50; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			expect(middleNode(listFromArray(values))?.val).toBe(Math.floor(n / 2));
		}
	});
});
