import { describe, expect, it } from "bun:test";
import { minimumDaysToScoreExactlyNPoints as minDays } from ".";

describe("4050. Minimum Days to Score Exactly N Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDays(2)).toBe(3);
		expect(minDays(9)).toBe(6);
		expect(minDays(12)).toBe(7);
	});
});
