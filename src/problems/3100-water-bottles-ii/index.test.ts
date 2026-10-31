import { describe, expect, it } from "bun:test";
import { waterBottlesII as maxBottlesDrunk } from ".";

describe("3100. Water Bottles II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBottlesDrunk(13, 6)).toBe(15);
		expect(maxBottlesDrunk(10, 3)).toBe(13);
	});
});
