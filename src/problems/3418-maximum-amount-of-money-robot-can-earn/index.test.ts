import { describe, expect, it } from "bun:test";
import { maximumAmountOfMoneyRobotCanEarn as maximumAmount } from ".";

describe("3418. Maximum Amount of Money Robot Can Earn", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumAmount([
				[0, 1, -1],
				[1, -2, 3],
				[2, -3, 4],
			]),
		).toBe(8);
		expect(
			maximumAmount([
				[10, 10, 10],
				[10, 10, 10],
			]),
		).toBe(40);
	});

	it("can neutralise the starting cell", () => {
		expect(maximumAmount([[-5]])).toBe(0);
		expect(maximumAmount([[-5, -3, -4]])).toBe(-3);
	});
});
