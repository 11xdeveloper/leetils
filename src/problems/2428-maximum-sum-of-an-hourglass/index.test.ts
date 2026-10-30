import { describe, expect, it } from "bun:test";
import { maximumSumOfAnHourglass as maxSum } from ".";

describe("2428. Maximum Sum of an Hourglass", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSum([
				[6, 2, 1, 3],
				[4, 2, 1, 5],
				[9, 2, 8, 7],
				[4, 1, 2, 9],
			]),
		).toBe(30);
		expect(
			maxSum([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toBe(35);
	});
});
