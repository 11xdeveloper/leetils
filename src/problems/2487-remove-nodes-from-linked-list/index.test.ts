import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { removeNodesFromLinkedList as removeNodes } from ".";

const remove = (values: number[]): number[] =>
	listToArray(removeNodes(listFromArray(values)));

describe("2487. Remove Nodes From Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([5, 2, 13, 3, 8])).toEqual([13, 8]);
		expect(remove([1, 1, 1, 1])).toEqual([1, 1, 1, 1]);
	});
});
