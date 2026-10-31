import { describe, expect, it } from "bun:test";
import { makeASquareWithTheSameColor as canMakeSquare } from ".";

describe("3127. Make a Square with the Same Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canMakeSquare([
				["B", "W", "B"],
				["B", "W", "W"],
				["B", "W", "B"],
			]),
		).toBeTrue();
		expect(
			canMakeSquare([
				["B", "W", "B"],
				["W", "B", "W"],
				["B", "W", "B"],
			]),
		).toBeFalse();
		expect(
			canMakeSquare([
				["B", "W", "B"],
				["B", "W", "W"],
				["B", "W", "W"],
			]),
		).toBeTrue();
	});
});
