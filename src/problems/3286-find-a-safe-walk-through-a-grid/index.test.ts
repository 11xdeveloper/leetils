import { describe, expect, it } from "bun:test";
import { findASafeWalkThroughAGrid as findSafeWalk } from ".";

describe("3286. Find a Safe Walk Through a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findSafeWalk(
				[
					[0, 1, 0, 0, 0],
					[0, 1, 0, 1, 0],
					[0, 0, 0, 1, 0],
				],
				1,
			),
		).toBeTrue();
		expect(
			findSafeWalk(
				[
					[0, 1, 1, 0, 0, 0],
					[1, 0, 1, 0, 0, 0],
					[0, 1, 1, 1, 0, 1],
					[0, 0, 1, 0, 1, 0],
				],
				3,
			),
		).toBeFalse();
		expect(
			findSafeWalk(
				[
					[1, 1, 1],
					[1, 0, 1],
					[1, 1, 1],
				],
				5,
			),
		).toBeTrue();
	});
});
