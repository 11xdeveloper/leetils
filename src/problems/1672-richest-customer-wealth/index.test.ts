import { describe, expect, it } from "bun:test";
import { richestCustomerWealth as maximumWealth } from ".";

describe("1672. Richest Customer Wealth", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumWealth([
				[1, 2, 3],
				[3, 2, 1],
			]),
		).toBe(6);
		expect(
			maximumWealth([
				[1, 5],
				[7, 3],
				[3, 5],
			]),
		).toBe(10);
		expect(
			maximumWealth([
				[2, 8, 7],
				[7, 1, 3],
				[1, 9, 5],
			]),
		).toBe(17);
	});
});
