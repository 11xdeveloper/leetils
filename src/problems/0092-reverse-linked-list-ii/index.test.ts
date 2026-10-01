import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { reverseLinkedListII } from ".";

const reverse = (values: number[], left: number, right: number): number[] =>
	listToArray(reverseLinkedListII(listFromArray(values), left, right));

const byArray = (values: number[], left: number, right: number): number[] => [
	...values.slice(0, left - 1),
	...values.slice(left - 1, right).toReversed(),
	...values.slice(right),
];

describe("92. Reverse Linked List II", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverse([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 4, 3, 2, 5]);
		expect(reverse([5], 1, 1)).toEqual([5]);
	});

	it("reverses the whole list", () => {
		expect(reverse([1, 2, 3], 1, 3)).toEqual([3, 2, 1]);
	});

	it("matches reversing part of an array for every range", () => {
		const values = [1, 2, 3, 4, 5, 6, 7];
		for (let left = 1; left <= values.length; left++) {
			for (let right = left; right <= values.length; right++) {
				expect(reverse(values, left, right)).toEqual(
					byArray(values, left, right),
				);
			}
		}
	});
});
