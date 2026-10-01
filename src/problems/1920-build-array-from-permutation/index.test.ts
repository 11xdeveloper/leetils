import { describe, expect, it } from "bun:test";
import { buildArrayFromPermutation as buildArray } from ".";

describe("1920. Build Array from Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(buildArray([0, 2, 1, 5, 3, 4])).toEqual([0, 1, 2, 4, 5, 3]);
		expect(buildArray([5, 0, 1, 2, 3, 4])).toEqual([4, 5, 0, 1, 2, 3]);
	});
});
