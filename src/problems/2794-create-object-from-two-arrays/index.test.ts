import { describe, expect, it } from "bun:test";
import { createObjectFromTwoArrays } from ".";

describe("2794. Create Object from Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(createObjectFromTwoArrays(["a", "b", "c"], [1, 2, 3])).toEqual({
			a: 1,
			b: 2,
			c: 3,
		});
		expect(createObjectFromTwoArrays(["1", 1, false], [4, 5, 6])).toEqual({
			1: 4,
			false: 6,
		});
		expect(createObjectFromTwoArrays([], [])).toEqual({});
	});
});
