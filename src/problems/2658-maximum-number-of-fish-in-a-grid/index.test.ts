import { describe, expect, it } from "bun:test";
import { maximumNumberOfFishInAGrid as findMaxFish } from ".";

describe("2658. Maximum Number of Fish in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaxFish([
				[0, 2, 1, 0],
				[4, 0, 0, 3],
				[1, 0, 0, 4],
				[0, 3, 2, 0],
			]),
		).toBe(7);
		expect(
			findMaxFish([
				[1, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 1],
			]),
		).toBe(1);
	});
});
