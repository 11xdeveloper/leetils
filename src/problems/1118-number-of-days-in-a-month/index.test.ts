import { describe, expect, it } from "bun:test";
import { numberOfDaysInAMonth as numberOfDays } from ".";

describe("1118. Number of Days in a Month", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfDays(1992, 7)).toBe(31);
		expect(numberOfDays(2000, 2)).toBe(29);
		expect(numberOfDays(1900, 2)).toBe(28);
	});

	it("matches the built-in Date for every month from 1583 to 2100", () => {
		for (let year = 1583; year <= 2100; year++) {
			for (let month = 1; month <= 12; month++) {
				// Day 0 of the next month is the last day of this one.
				const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
				expect(numberOfDays(year, month)).toBe(days);
			}
		}
	});
});
