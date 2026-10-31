import { describe, expect, it } from "bun:test";
import { smallestAllOnesMultiple as minAllOneMultiple } from ".";

describe("3790. Smallest All-Ones Multiple", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAllOneMultiple(3)).toBe(3);
		expect(minAllOneMultiple(7)).toBe(6);
		expect(minAllOneMultiple(2)).toBe(-1);
	});
});
