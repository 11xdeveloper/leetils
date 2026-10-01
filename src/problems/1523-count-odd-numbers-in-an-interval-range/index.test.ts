import { describe, expect, it } from "bun:test";
import { countOddNumbersInAnIntervalRange as countOdds } from ".";

describe("1523. Count Odd Numbers in an Interval Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOdds(3, 7)).toBe(3);
		expect(countOdds(8, 10)).toBe(1);
	});

	it("matches counting for every range up to 60", () => {
		for (let low = 0; low <= 60; low++) {
			for (let high = low; high <= 60; high++) {
				let count = 0;
				for (let x = low; x <= high; x++) if (x % 2 === 1) count++;
				expect(countOdds(low, high)).toBe(count);
			}
		}
	});

	it("handles 10^9", () => {
		expect(countOdds(0, 10 ** 9)).toBe(5 * 10 ** 8);
	});
});
