import { describe, expect, it } from "bun:test";
import { numberOfWaysToSelectBuildings as numberOfWays } from ".";

describe("2222. Number of Ways to Select Buildings", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays("001101")).toBe(6);
		expect(numberOfWays("11100")).toBe(0);
	});
});
