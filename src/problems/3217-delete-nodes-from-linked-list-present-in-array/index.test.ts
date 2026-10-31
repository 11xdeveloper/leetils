import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { deleteNodesFromLinkedListPresentInArray as modifiedList } from ".";

describe("3217. Delete Nodes From Linked List Present in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			listToArray(modifiedList([1, 2, 3], listFromArray([1, 2, 3, 4, 5]))),
		).toEqual([4, 5]);
		expect(
			listToArray(modifiedList([1], listFromArray([1, 2, 1, 2, 1, 2]))),
		).toEqual([2, 2, 2]);
		expect(listToArray(modifiedList([5], listFromArray([1, 2, 3, 4])))).toEqual(
			[1, 2, 3, 4],
		);
	});
});
