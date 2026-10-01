import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { reverseLinkedList } from ".";

const reverse = (values: number[]): number[] =>
	listToArray(reverseLinkedList(listFromArray(values)));

describe("206. Reverse Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverse([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
		expect(reverse([1, 2])).toEqual([2, 1]);
		expect(reverse([])).toEqual([]);
	});

	it("handles a list at the constraint of 5000 nodes", () => {
		const values = Array.from({ length: 5000 }, (_, i) => i);
		expect(reverse(values)).toEqual(values.toReversed());
	});
});
