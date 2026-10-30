import { describe, expect, it } from "bun:test";
import { checkIfTheNumberIsFascinating as isFascinating } from ".";

describe("2729. Check if The Number is Fascinating", () => {
	it("solves the examples from the problem statement", () => {
		expect(isFascinating(192)).toBe(true);
		expect(isFascinating(100)).toBe(false);
	});
});
