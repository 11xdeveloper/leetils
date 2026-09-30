import { describe, expect, it } from "bun:test";
import { jewelsAndStones as numJewelsInStones } from ".";

describe("771. Jewels and Stones", () => {
	it("solves the examples from the problem statement", () => {
		expect(numJewelsInStones("aA", "aAAbbbb")).toBe(3);
		expect(numJewelsInStones("z", "ZZ")).toBe(0);
	});
});
