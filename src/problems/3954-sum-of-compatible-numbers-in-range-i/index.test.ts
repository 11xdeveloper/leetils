import { describe, expect, it } from "bun:test";
import { sumOfCompatibleNumbersInRangeI as sumOfGoodIntegers } from ".";

describe("3954. Sum of Compatible Numbers in Range I", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfGoodIntegers(2, 3)).toBe(10);
		expect(sumOfGoodIntegers(5, 1)).toBe(0);
	});
});
