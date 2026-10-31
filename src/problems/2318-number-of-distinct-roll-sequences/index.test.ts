import { describe, expect, it } from "bun:test";
import { numberOfDistinctRollSequences as distinctSequences } from ".";

describe("2318. Number of Distinct Roll Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctSequences(4)).toBe(184);
		expect(distinctSequences(2)).toBe(22);
	});

	it("allows any single roll", () => {
		expect(distinctSequences(1)).toBe(6);
	});
});
