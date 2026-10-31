import { describe, expect, it } from "bun:test";
import { totalWavinessOfNumbersInRangeI as totalWaviness } from ".";

describe("3751. Total Waviness of Numbers in Range I", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalWaviness(120, 130)).toBe(3);
		expect(totalWaviness(198, 202)).toBe(3);
		expect(totalWaviness(4848, 4848)).toBe(2);
	});
});
