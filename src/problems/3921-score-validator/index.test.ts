import { describe, expect, it } from "bun:test";
import { scoreValidator } from ".";

describe("3921. Score Validator", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreValidator(["1", "4", "W", "6", "WD"])).toEqual([12, 1]);
		expect(scoreValidator(["WD", "NB", "0", "4", "4"])).toEqual([10, 0]);
		expect(scoreValidator(new Array<string>(11).fill("W"))).toEqual([0, 10]);
	});
});
