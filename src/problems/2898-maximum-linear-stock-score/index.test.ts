import { describe, expect, it } from "bun:test";
import { maximumLinearStockScore as maxScore } from ".";

describe("2898. Maximum Linear Stock Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 5, 3, 7, 8])).toBe(20);
		expect(maxScore([5, 6, 7, 8, 9])).toBe(35);
	});
});
