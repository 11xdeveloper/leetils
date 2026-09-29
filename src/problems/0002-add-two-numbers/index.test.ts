import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { addTwoNumbers } from ".";

const add = (a: number[], b: number[]): number[] =>
	listToArray(addTwoNumbers(listFromArray(a), listFromArray(b)));

describe("2. Add Two Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(add([2, 4, 3], [5, 6, 4])).toEqual([7, 0, 8]);
		expect(add([0], [0])).toEqual([0]);
		expect(add([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])).toEqual([
			8, 9, 9, 9, 0, 0, 0, 1,
		]);
	});

	it("adds lists of different lengths in either order", () => {
		expect(add([9, 9, 9, 9], [9, 9, 9])).toEqual([8, 9, 9, 0, 1]);
		expect(add([9, 9, 9], [9, 9, 9, 9])).toEqual([8, 9, 9, 0, 1]);
		expect(add([1, 8], [0])).toEqual([1, 8]);
	});

	it("adds a new node for a final carry", () => {
		expect(add([1], [9])).toEqual([0, 1]);
		expect(add([5], [5])).toEqual([0, 1]);
	});

	it("does not modify the input lists", () => {
		const l1 = listFromArray([2, 4, 3]);
		const l2 = listFromArray([5, 6, 4]);
		addTwoNumbers(l1, l2);
		expect(listToArray(l1)).toEqual([2, 4, 3]);
		expect(listToArray(l2)).toEqual([5, 6, 4]);
	});
});
