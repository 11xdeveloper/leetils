import { describe, expect, it } from "bun:test";
import { maximizeProfitFromTaskAssignment as maxProfit } from ".";

describe("3476. Maximize Profit from Task Assignment", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxProfit(
				[1, 2, 3, 4, 5],
				[
					[1, 100],
					[2, 400],
					[3, 100],
					[3, 400],
				],
			),
		).toBe(1000);
		expect(maxProfit([10, 10000, 100000000], [[1, 100]])).toBe(100);
		expect(
			maxProfit(
				[7],
				[
					[3, 3],
					[3, 3],
				],
			),
		).toBe(3);
	});
});
