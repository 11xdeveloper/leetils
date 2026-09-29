import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { removeNthNodeFromEndOfList } from ".";

const remove = (values: number[], n: number): number[] =>
	listToArray(removeNthNodeFromEndOfList(listFromArray(values), n));

describe("19. Remove Nth Node From End of List", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3, 5]);
		expect(remove([1], 1)).toEqual([]);
		expect(remove([1, 2], 1)).toEqual([1]);
	});

	it("removes the head", () => {
		expect(remove([1, 2], 2)).toEqual([2]);
		expect(remove([1, 2, 3], 3)).toEqual([2, 3]);
	});

	it("removes every position in a list", () => {
		const values = [1, 2, 3, 4, 5, 6];
		for (let n = 1; n <= values.length; n++) {
			const index = values.length - n;
			expect(remove(values, n)).toEqual(values.toSpliced(index, 1));
		}
	});
});
