import { describe, expect, it } from "bun:test";
import { findClosestPerson as findClosest } from ".";

describe("3516. Find Closest Person", () => {
	it("solves the examples from the problem statement", () => {
		expect(findClosest(2, 7, 4)).toBe(1);
		expect(findClosest(2, 5, 6)).toBe(2);
		expect(findClosest(1, 5, 3)).toBe(0);
	});
});
