import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { insertGreatestCommonDivisorsInLinkedList as insertGreatestCommonDivisors } from ".";

describe("2807. Insert Greatest Common Divisors in Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			listToArray(insertGreatestCommonDivisors(listFromArray([18, 6, 10, 3]))),
		).toEqual([18, 6, 6, 2, 10, 1, 3]);
		expect(
			listToArray(insertGreatestCommonDivisors(listFromArray([7]))),
		).toEqual([7]);
	});
});
