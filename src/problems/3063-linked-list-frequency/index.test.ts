import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { linkedListFrequency as frequenciesOfElements } from ".";

describe("3063. Linked List Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			listToArray(frequenciesOfElements(listFromArray([1, 1, 2, 1, 2, 3]))),
		).toEqual([3, 2, 1]);
		expect(
			listToArray(frequenciesOfElements(listFromArray([1, 1, 2, 2, 2]))),
		).toEqual([2, 3]);
		expect(
			listToArray(frequenciesOfElements(listFromArray([6, 5, 4, 3, 2, 1]))),
		).toEqual([1, 1, 1, 1, 1, 1]);
	});
});
