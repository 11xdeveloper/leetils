import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { deleteTheMiddleNodeOfALinkedList as deleteMiddle } from ".";

const remove = (values: number[]): number[] =>
	listToArray(deleteMiddle(listFromArray(values)));

describe("2095. Delete the Middle Node of a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([1, 3, 4, 7, 1, 2, 6])).toEqual([1, 3, 4, 1, 2, 6]);
		expect(remove([1, 2, 3, 4])).toEqual([1, 2, 4]);
		expect(remove([2, 1])).toEqual([2]);
	});

	it("matches removing index n / 2 for every length", () => {
		for (let n = 1; n <= 12; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			expect(remove(values)).toEqual(values.toSpliced(Math.floor(n / 2), 1));
		}
	});
});
