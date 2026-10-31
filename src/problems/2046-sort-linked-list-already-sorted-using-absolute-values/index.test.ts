import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { sortLinkedListAlreadySortedUsingAbsoluteValues as sortLinkedList } from ".";

const sort = (values: number[]): number[] =>
	listToArray(sortLinkedList(listFromArray(values)));

describe("2046. Sort Linked List Already Sorted Using Absolute Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(sort([0, 2, -5, 5, 10, -10])).toEqual([-10, -5, 0, 2, 5, 10]);
		expect(sort([0, 1, 2])).toEqual([0, 1, 2]);
		expect(sort([1])).toEqual([1]);
	});

	it("handles negative heads and all-negative lists", () => {
		expect(sort([-1, -2, -3])).toEqual([-3, -2, -1]);
		expect(sort([-1, 1, -2, 2])).toEqual([-2, -1, 1, 2]);
		expect(sort([])).toEqual([]);
	});
});
