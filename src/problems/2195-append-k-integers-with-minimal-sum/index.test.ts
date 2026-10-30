import { describe, expect, it } from "bun:test";
import { appendKIntegersWithMinimalSum as minimalKSum } from ".";

describe("2195. Append K Integers With Minimal Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimalKSum([1, 4, 25, 10, 25], 2)).toBe(5);
		expect(minimalKSum([5, 6], 6)).toBe(25);
	});

	it("handles the largest k", () => {
		const k = 100_000_000;
		expect(minimalKSum([1_000_000_000], k)).toBe((k * (k + 1)) / 2);
	});
});
