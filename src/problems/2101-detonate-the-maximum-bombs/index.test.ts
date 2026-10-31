import { describe, expect, it } from "bun:test";
import { detonateTheMaximumBombs as maximumDetonation } from ".";

describe("2101. Detonate the Maximum Bombs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumDetonation([
				[2, 1, 3],
				[6, 1, 4],
			]),
		).toBe(2);
		expect(
			maximumDetonation([
				[1, 1, 5],
				[10, 10, 5],
			]),
		).toBe(1);
		expect(
			maximumDetonation([
				[1, 2, 3],
				[2, 3, 1],
				[3, 4, 2],
				[4, 5, 3],
				[5, 6, 4],
			]),
		).toBe(5);
	});

	it("handles large coordinates exactly", () => {
		expect(
			maximumDetonation([
				[1, 1, 100_000],
				[100_000, 100_000, 1],
			]),
		).toBe(1);
	});
});
