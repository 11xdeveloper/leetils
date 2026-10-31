import { describe, expect, it } from "bun:test";
import { findTheOriginalArrayOfPrefixXor as findArray } from ".";

describe("2433. Find The Original Array of Prefix Xor", () => {
	it("solves the examples from the problem statement", () => {
		expect(findArray([5, 2, 0, 3, 1])).toEqual([5, 7, 2, 3, 2]);
		expect(findArray([13])).toEqual([13]);
	});
});
