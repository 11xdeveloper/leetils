import { describe, expect, it } from "bun:test";
import { maximumGoodPeopleBasedOnStatements as maximumGood } from ".";

describe("2151. Maximum Good People Based on Statements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumGood([
				[2, 1, 2],
				[1, 2, 2],
				[2, 0, 2],
			]),
		).toBe(2);
		expect(
			maximumGood([
				[2, 0],
				[0, 2],
			]),
		).toBe(1);
	});
});
