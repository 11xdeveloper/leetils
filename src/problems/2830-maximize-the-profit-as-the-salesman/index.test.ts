import { describe, expect, it } from "bun:test";
import { maximizeTheProfitAsTheSalesman as maximizeTheProfit } from ".";

describe("2830. Maximize the Profit as the Salesman", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximizeTheProfit(5, [
				[0, 0, 1],
				[0, 2, 2],
				[1, 3, 2],
			]),
		).toBe(3);
		expect(
			maximizeTheProfit(5, [
				[0, 0, 1],
				[0, 2, 10],
				[1, 3, 2],
			]),
		).toBe(10);
	});
});
