import { describe, expect, it } from "bun:test";
import { namingACompany as distinctNames } from ".";

describe("2306. Naming a Company", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctNames(["coffee", "donuts", "time", "toffee"])).toBe(6);
		expect(distinctNames(["lack", "back"])).toBe(0);
	});
});
