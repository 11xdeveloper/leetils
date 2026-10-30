import { describe, expect, it } from "bun:test";
import { escapeTheSpreadingFire as maximumMinutes } from ".";

describe("2258. Escape the Spreading Fire", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumMinutes([
				[0, 2, 0, 0, 0, 0, 0],
				[0, 0, 0, 2, 2, 1, 0],
				[0, 2, 0, 0, 1, 2, 0],
				[0, 0, 2, 2, 2, 0, 2],
				[0, 0, 0, 0, 0, 0, 0],
			]),
		).toBe(3);
		expect(
			maximumMinutes([
				[0, 0, 0, 0],
				[0, 1, 2, 0],
				[0, 2, 0, 0],
			]),
		).toBe(-1);
		expect(
			maximumMinutes([
				[0, 0, 0],
				[2, 2, 0],
				[1, 2, 0],
			]),
		).toBe(1_000_000_000);
	});
});
