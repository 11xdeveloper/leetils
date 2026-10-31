import { describe, expect, it } from "bun:test";
import { findTheMinimumAreaToCoverAllOnesI as minimumArea } from ".";

describe("3195. Find the Minimum Area to Cover All Ones I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumArea([
				[0, 1, 0],
				[1, 0, 1],
			]),
		).toBe(6);
		expect(
			minimumArea([
				[1, 0],
				[0, 0],
			]),
		).toBe(1);
	});
});
