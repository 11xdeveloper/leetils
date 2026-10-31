import { describe, expect, it } from "bun:test";
import { numberOfFlowersInFullBloom as fullBloomFlowers } from ".";

describe("2251. Number of Flowers in Full Bloom", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			fullBloomFlowers(
				[
					[1, 6],
					[3, 7],
					[9, 12],
					[4, 13],
				],
				[2, 3, 7, 11],
			),
		).toEqual([1, 2, 2, 2]);
		expect(
			fullBloomFlowers(
				[
					[1, 10],
					[3, 3],
				],
				[3, 3, 2],
			),
		).toEqual([2, 2, 1]);
	});
});
