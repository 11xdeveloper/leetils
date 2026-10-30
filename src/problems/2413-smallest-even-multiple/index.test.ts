import { describe, expect, it } from "bun:test";
import { smallestEvenMultiple } from ".";

describe("2413. Smallest Even Multiple", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestEvenMultiple(5)).toBe(10);
		expect(smallestEvenMultiple(6)).toBe(6);
	});
});
