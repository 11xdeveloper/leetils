import { describe, expect, it } from "bun:test";
import { maximalNetworkRank } from ".";

describe("1615. Maximal Network Rank", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximalNetworkRank(4, [
				[0, 1],
				[0, 3],
				[1, 2],
				[1, 3],
			]),
		).toBe(4);
		expect(
			maximalNetworkRank(5, [
				[0, 1],
				[0, 3],
				[1, 2],
				[1, 3],
				[2, 3],
				[2, 4],
			]),
		).toBe(5);
		expect(
			maximalNetworkRank(8, [
				[0, 1],
				[1, 2],
				[2, 3],
				[2, 4],
				[5, 6],
				[5, 7],
			]),
		).toBe(5);
	});

	it("returns 0 without roads", () => {
		expect(maximalNetworkRank(3, [])).toBe(0);
	});
});
