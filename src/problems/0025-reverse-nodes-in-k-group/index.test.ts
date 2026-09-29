import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { reverseNodesInKGroup } from ".";

const reverse = (values: number[], k: number): number[] =>
	listToArray(reverseNodesInKGroup(listFromArray(values), k));

/** Reverses each full group of k values in an array. */
const byArray = (values: number[], k: number): number[] => {
	const result: number[] = [];
	for (let i = 0; i < values.length; i += k) {
		const group = values.slice(i, i + k);
		result.push(...(group.length === k ? group.toReversed() : group));
	}
	return result;
};

describe("25. Reverse Nodes in k-Group", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverse([1, 2, 3, 4, 5], 2)).toEqual([2, 1, 4, 3, 5]);
		expect(reverse([1, 2, 3, 4, 5], 3)).toEqual([3, 2, 1, 4, 5]);
	});

	it("leaves the list unchanged when k is 1", () => {
		expect(reverse([1, 2, 3], 1)).toEqual([1, 2, 3]);
	});

	it("reverses the whole list when k is its length", () => {
		expect(reverse([1, 2, 3, 4], 4)).toEqual([4, 3, 2, 1]);
		expect(reverse([1], 1)).toEqual([1]);
	});

	it("moves nodes rather than their values", () => {
		const head = listFromArray([1, 2, 3]);
		const third = head?.next?.next;
		expect(reverseNodesInKGroup(head, 3)).toBe(third ?? null);
	});

	it("matches reversing groups of an array, for every k", () => {
		const values = Array.from({ length: 11 }, (_, i) => i + 1);
		for (let k = 1; k <= values.length; k++) {
			expect(reverse(values, k)).toEqual(byArray(values, k));
		}
	});
});
