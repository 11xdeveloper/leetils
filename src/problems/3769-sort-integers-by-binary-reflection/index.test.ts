import { describe, expect, it } from "bun:test";
import { sortIntegersByBinaryReflection as sortByReflection } from ".";

describe("3769. Sort Integers by Binary Reflection", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortByReflection([4, 5, 4])).toEqual([4, 4, 5]);
		expect(sortByReflection([3, 6, 5, 8])).toEqual([8, 3, 6, 5]);
	});
});
