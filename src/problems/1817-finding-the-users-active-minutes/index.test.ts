import { describe, expect, it } from "bun:test";
import { findingTheUsersActiveMinutes as findingUsersActiveMinutes } from ".";

describe("1817. Finding the Users Active Minutes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findingUsersActiveMinutes(
				[
					[0, 5],
					[1, 2],
					[0, 2],
					[0, 5],
					[1, 3],
				],
				5,
			),
		).toEqual([0, 2, 0, 0, 0]);
		expect(
			findingUsersActiveMinutes(
				[
					[1, 1],
					[2, 2],
					[2, 3],
				],
				4,
			),
		).toEqual([1, 1, 0, 0]);
	});
});
