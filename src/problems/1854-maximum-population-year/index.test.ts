import { describe, expect, it } from "bun:test";
import { maximumPopulationYear } from ".";

describe("1854. Maximum Population Year", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumPopulationYear([
				[1993, 1999],
				[2000, 2010],
			]),
		).toBe(1993);
		expect(
			maximumPopulationYear([
				[1950, 1961],
				[1960, 1971],
				[1970, 1981],
			]),
		).toBe(1960);
	});
});
