import { describe, expect, it } from "bun:test";
import { maximumPointsActivatedWithOneAddition as maxActivated } from ".";

describe("3873. Maximum Points Activated with One Addition", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxActivated([
				[1, 1],
				[1, 2],
				[2, 2],
			]),
		).toBe(4);
		expect(
			maxActivated([
				[2, 2],
				[1, 1],
				[3, 3],
			]),
		).toBe(3);
		expect(
			maxActivated([
				[2, 3],
				[2, 2],
				[1, 1],
				[4, 5],
			]),
		).toBe(4);
	});
});
