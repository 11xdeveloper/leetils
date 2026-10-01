import { describe, expect, it } from "bun:test";
import { compareVersionNumbers as compare } from ".";

describe("165. Compare Version Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(compare("1.2", "1.10")).toBe(-1);
		expect(compare("1.01", "1.001")).toBe(0);
		expect(compare("1.0", "1.0.0.0")).toBe(0);
	});

	it("compares revisions as numbers, not strings", () => {
		expect(compare("1.10", "1.9")).toBe(1);
		expect(compare("0.1", "1.1")).toBe(-1);
	});

	it("treats missing revisions as zero", () => {
		expect(compare("1", "1.0.1")).toBe(-1);
		expect(compare("1.0.1", "1")).toBe(1);
	});

	it("is antisymmetric", () => {
		for (const [a, b] of [
			["1.2.3", "1.2.4"],
			["7.5.2.4", "7.5.3"],
			["1.0", "1"],
		] as const) {
			expect(compare(a, b)).toBe(-compare(b, a) || 0);
		}
	});
});
