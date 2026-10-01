import { describe, expect, it } from "bun:test";
import {
	type ListNode,
	listFromArray,
	listToArray,
} from "../../structures/list-node";
import { mergeTwoSortedLists } from ".";

const merge = (a: number[], b: number[]): number[] =>
	listToArray(mergeTwoSortedLists(listFromArray(a), listFromArray(b)));

const nodesOf = (head: ListNode | null): ListNode[] => {
	const nodes: ListNode[] = [];
	for (let node = head; node !== null; node = node.next) nodes.push(node);
	return nodes;
};

describe("21. Merge Two Sorted Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(merge([1, 2, 4], [1, 3, 4])).toEqual([1, 1, 2, 3, 4, 4]);
		expect(merge([], [])).toEqual([]);
		expect(merge([], [0])).toEqual([0]);
	});

	it("handles lists that don't overlap, in either order", () => {
		expect(merge([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
		expect(merge([4, 5, 6], [1, 2, 3])).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it("handles negative values and duplicates", () => {
		expect(merge([-10, -3, 0, 0], [-5, 0, 7])).toEqual([
			-10, -5, -3, 0, 0, 0, 7,
		]);
	});

	it("reuses the input nodes instead of creating new ones", () => {
		const list1 = listFromArray([1, 3]);
		const list2 = listFromArray([2, 4]);
		const inputNodes = new Set([...nodesOf(list1), ...nodesOf(list2)]);
		const merged = nodesOf(mergeTwoSortedLists(list1, list2));
		expect(merged).toHaveLength(4);
		for (const node of merged) expect(inputNodes.has(node)).toBeTrue();
	});
});
