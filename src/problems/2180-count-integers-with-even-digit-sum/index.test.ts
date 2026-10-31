import { describe, expect, it } from "bun:test";
import { countIntegersWithEvenDigitSum as countEven } from ".";

describe("2180. Count Integers With Even Digit Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(countEven(4)).toBe(2);
		expect(countEven(30)).toBe(14);
	});
});
