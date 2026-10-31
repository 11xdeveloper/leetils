import { describe, expect, it } from "bun:test";
import { returnLengthOfArgumentsPassed } from ".";

describe("2703. Return Length of Arguments Passed", () => {
	it("solves the examples from the problem statement", () => {
		expect(returnLengthOfArgumentsPassed(5)).toBe(1);
		expect(returnLengthOfArgumentsPassed({}, null, "3")).toBe(3);
		expect(returnLengthOfArgumentsPassed()).toBe(0);
	});
});
