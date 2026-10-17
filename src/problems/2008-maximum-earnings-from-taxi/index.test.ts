import { describe, expect, it } from "bun:test";
import { maximumEarningsFromTaxi as maxEarnings } from ".";

describe("2008. Maximum Earnings From Taxi", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxEarnings(5, [
				[2, 5, 4],
				[1, 5, 1],
			]),
		).toBe(7);
		expect(
			maxEarnings(20, [
				[1, 6, 1],
				[3, 10, 2],
				[10, 12, 3],
				[11, 12, 2],
				[12, 15, 2],
				[13, 18, 1],
			]),
		).toBe(20);
	});

	it("chains rides that meet at a point", () => {
		expect(
			maxEarnings(4, [
				[1, 2, 0],
				[2, 3, 0],
				[3, 4, 0],
				[1, 4, 0],
			]),
		).toBe(3);
	});
});
