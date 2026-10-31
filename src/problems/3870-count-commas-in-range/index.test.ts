import { describe, expect, it } from "bun:test";
import { countCommasInRange as countCommas } from ".";

describe("3870. Count Commas in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCommas(1002)).toBe(3);
		expect(countCommas(998)).toBe(0);
	});
});
