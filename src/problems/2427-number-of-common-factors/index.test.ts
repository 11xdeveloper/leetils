import { describe, expect, it } from "bun:test";
import { numberOfCommonFactors as commonFactors } from ".";

describe("2427. Number of Common Factors", () => {
	it("solves the examples from the problem statement", () => {
		expect(commonFactors(12, 6)).toBe(4);
		expect(commonFactors(25, 30)).toBe(2);
	});
});
