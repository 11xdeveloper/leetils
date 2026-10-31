import { describe, expect, it } from "bun:test";
import { addTwoIntegers as sum } from ".";

describe("2235. Add Two Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sum(12, 5)).toBe(17);
		expect(sum(-10, 4)).toBe(-6);
	});
});
