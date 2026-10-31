import { describe, expect, it } from "bun:test";
import { maximumNumberOfKDivisibleComponents as maxKDivisibleComponents } from ".";

describe("2872. Maximum Number of K-Divisible Components", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxKDivisibleComponents(
				5,
				[
					[0, 2],
					[1, 2],
					[1, 3],
					[2, 4],
				],
				[1, 8, 1, 4, 4],
				6,
			),
		).toBe(2);
		expect(
			maxKDivisibleComponents(
				7,
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
					[2, 6],
				],
				[3, 0, 6, 1, 5, 2, 1],
				3,
			),
		).toBe(3);
	});
});
