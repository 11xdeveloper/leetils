import { describe, expect, it } from "bun:test";
import { findIfPathExistsInGraph as validPath } from ".";

describe("1971. Find if Path Exists in Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			validPath(
				3,
				[
					[0, 1],
					[1, 2],
					[2, 0],
				],
				0,
				2,
			),
		).toBeTrue();
		expect(
			validPath(
				6,
				[
					[0, 1],
					[0, 2],
					[3, 5],
					[5, 4],
					[4, 3],
				],
				0,
				5,
			),
		).toBeFalse();
	});

	it("connects a node to itself", () => {
		expect(validPath(1, [], 0, 0)).toBeTrue();
	});
});
