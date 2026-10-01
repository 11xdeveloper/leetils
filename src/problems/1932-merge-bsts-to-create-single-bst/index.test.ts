import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { mergeBstsToCreateSingleBst as canMerge } from ".";

const merge = (arrays: (number | null)[][]) =>
	treeToArray(canMerge(arrays.map((values) => treeFromArray(values))));

describe("1932. Merge BSTs to Create Single BST", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			merge([
				[2, 1],
				[3, 2, 5],
				[5, 4],
			]),
		).toEqual([3, 2, 5, 1, null, 4]);
		expect(
			merge([
				[5, 3, 8],
				[3, 2, 6],
			]),
		).toEqual([]);
		expect(merge([[5, 4], [3]])).toEqual([]);
	});

	it("handles a single tree", () => {
		expect(merge([[2, 1, 3]])).toEqual([2, 1, 3]);
	});

	it("rejects merges that break the ordering further up", () => {
		expect(
			merge([
				[5, 3, 8],
				[3, 2, 4],
				[8, 6, 9],
				[4, null, 7],
			]),
		).toEqual([]);
		expect(
			merge([
				[5, 3, 8],
				[3, 2, 4],
				[8, 6, 9],
			]),
		).toEqual([5, 3, 8, 2, 4, 6, 9]);
	});

	it("rejects a cycle of trees", () => {
		expect(
			merge([
				[2, 1],
				[1, null, 2],
			]),
		).toEqual([]);
	});
});
