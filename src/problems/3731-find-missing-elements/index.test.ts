import { describe, expect, it } from "bun:test";
import { findMissingElements } from ".";

describe("3731. Find Missing Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMissingElements([1, 4, 2, 5])).toEqual([3]);
		expect(findMissingElements([7, 8, 6, 9])).toEqual([]);
		expect(findMissingElements([5, 1])).toEqual([2, 3, 4]);
	});
});
