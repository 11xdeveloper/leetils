import { describe, expect, it } from "bun:test";
import { minimumAmountOfTimeToFillCups as fillCups } from ".";

describe("2335. Minimum Amount of Time to Fill Cups", () => {
	it("solves the examples from the problem statement", () => {
		expect(fillCups([1, 4, 2])).toBe(4);
		expect(fillCups([5, 4, 4])).toBe(7);
		expect(fillCups([5, 0, 0])).toBe(5);
	});
});
