import { describe, expect, it } from "bun:test";
import { countCommasInRangeII as countCommas } from ".";

describe("3871. Count Commas in Range II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCommas(1002)).toBe(3);
		expect(countCommas(998)).toBe(0);
	});

	it("matches counting number by number", () => {
		let commas = 0;
		for (let x = 1; x <= 20000; x++) {
			commas += Math.floor((String(x).length - 1) / 3);
			if (x % 997 === 0) expect(countCommas(x)).toBe(commas);
		}
	});

	it("handles the largest input", () => {
		expect(countCommas(1e15)).toBe(5e15 - 1_001_001_001_000 - 1e15 + 5);
	});
});
