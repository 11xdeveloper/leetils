import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { doubleANumberRepresentedAsALinkedList as doubleIt } from ".";

describe("2816. Double a Number Represented as a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(listToArray(doubleIt(listFromArray([1, 8, 9])))).toEqual([3, 7, 8]);
		expect(listToArray(doubleIt(listFromArray([9, 9, 9])))).toEqual([
			1, 9, 9, 8,
		]);
	});

	it("matches doubling small numbers", () => {
		for (let x = 0; x <= 2000; x++)
			expect(
				listToArray(doubleIt(listFromArray([...String(x)].map(Number)))),
			).toEqual([...String(2 * x)].map(Number));
	});
});
