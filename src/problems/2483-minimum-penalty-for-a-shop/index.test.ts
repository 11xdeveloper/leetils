import { describe, expect, it } from "bun:test";
import { minimumPenaltyForAShop as bestClosingTime } from ".";

describe("2483. Minimum Penalty for a Shop", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestClosingTime("YYNY")).toBe(2);
		expect(bestClosingTime("NNNNN")).toBe(0);
		expect(bestClosingTime("YYYY")).toBe(4);
	});
});
