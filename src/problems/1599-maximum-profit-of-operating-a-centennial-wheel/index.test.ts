import { describe, expect, it } from "bun:test";
import { maximumProfitOfOperatingACentennialWheel as minOperationsMaxProfit } from ".";

describe("1599. Maximum Profit of Operating a Centennial Wheel", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperationsMaxProfit([8, 3], 5, 6)).toBe(3);
		expect(minOperationsMaxProfit([10, 9, 6], 6, 4)).toBe(7);
		expect(minOperationsMaxProfit([3, 4, 0, 5, 1], 1, 92)).toBe(-1);
	});

	it("picks the earliest of equal best profits", () => {
		// Each full gondola earns 4, and running costs 4: profit stays at 0 or below.
		expect(minOperationsMaxProfit([4, 4], 1, 4)).toBe(-1);
		expect(minOperationsMaxProfit([2, 0, 2], 3, 5)).toBe(1);
	});
});
