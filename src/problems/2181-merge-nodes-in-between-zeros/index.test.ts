import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { mergeNodesInBetweenZeros as mergeNodes } from ".";

const merge = (values: number[]): number[] =>
	listToArray(mergeNodes(listFromArray(values)));

describe("2181. Merge Nodes in Between Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(merge([0, 3, 1, 0, 4, 5, 2, 0])).toEqual([4, 11]);
		expect(merge([0, 1, 0, 3, 0, 2, 2, 0])).toEqual([1, 3, 4]);
	});
});
