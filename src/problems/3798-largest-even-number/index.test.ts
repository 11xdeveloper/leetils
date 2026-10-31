import { describe, expect, it } from "bun:test";
import { largestEvenNumber as largestEven } from ".";

describe("3798. Largest Even Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestEven("1112")).toBe("1112");
		expect(largestEven("221")).toBe("22");
		expect(largestEven("1")).toBe("");
	});
});
