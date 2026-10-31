import { describe, expect, it } from "bun:test";
import { countDaysSpentTogether } from ".";

describe("2409. Count Days Spent Together", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDaysSpentTogether("08-15", "08-18", "08-16", "08-19")).toBe(3);
		expect(countDaysSpentTogether("10-01", "10-31", "11-01", "12-31")).toBe(0);
	});
});
