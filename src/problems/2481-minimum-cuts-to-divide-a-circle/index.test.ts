import { describe, expect, it } from "bun:test";
import { minimumCutsToDivideACircle as numberOfCuts } from ".";

describe("2481. Minimum Cuts to Divide a Circle", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfCuts(4)).toBe(2);
		expect(numberOfCuts(3)).toBe(3);
		expect(numberOfCuts(1)).toBe(0);
	});
});
