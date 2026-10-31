import { describe, expect, it } from "bun:test";
import { maximumNumberOfAlloys as maxNumberOfAlloys } from ".";

describe("2861. Maximum Number of Alloys", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxNumberOfAlloys(
				3,
				2,
				15,
				[
					[1, 1, 1],
					[1, 1, 10],
				],
				[0, 0, 0],
				[1, 2, 3],
			),
		).toBe(2);
		expect(
			maxNumberOfAlloys(
				3,
				2,
				15,
				[
					[1, 1, 1],
					[1, 1, 10],
				],
				[0, 0, 100],
				[1, 2, 3],
			),
		).toBe(5);
		expect(
			maxNumberOfAlloys(
				2,
				3,
				10,
				[
					[2, 1],
					[1, 2],
					[1, 1],
				],
				[1, 1],
				[5, 5],
			),
		).toBe(2);
	});
});
