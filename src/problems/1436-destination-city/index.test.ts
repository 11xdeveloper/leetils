import { describe, expect, it } from "bun:test";
import { destinationCity as destCity } from ".";

describe("1436. Destination City", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			destCity([
				["London", "New York"],
				["New York", "Lima"],
				["Lima", "Sao Paulo"],
			]),
		).toBe("Sao Paulo");
		expect(
			destCity([
				["B", "C"],
				["D", "B"],
				["C", "A"],
			]),
		).toBe("A");
		expect(destCity([["A", "Z"]])).toBe("Z");
	});
});
