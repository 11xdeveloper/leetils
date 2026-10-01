import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { swapNodesInPairs } from ".";

const swap = (values: number[]): number[] =>
	listToArray(swapNodesInPairs(listFromArray(values)));

describe("24. Swap Nodes in Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(swap([1, 2, 3, 4])).toEqual([2, 1, 4, 3]);
		expect(swap([])).toEqual([]);
		expect(swap([1])).toEqual([1]);
		expect(swap([1, 2, 3])).toEqual([2, 1, 3]);
	});

	it("leaves the last node in place when the length is odd", () => {
		expect(swap([1, 2, 3, 4, 5])).toEqual([2, 1, 4, 3, 5]);
	});

	it("moves nodes rather than their values", () => {
		const head = listFromArray([1, 2]);
		const second = head?.next;
		const result = swapNodesInPairs(head);
		expect(result).toBe(second ?? null);
		expect(result?.next).toBe(head);
		expect(result?.val).toBe(2);
	});
});
