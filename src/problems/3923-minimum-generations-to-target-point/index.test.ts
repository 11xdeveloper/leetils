import { describe, expect, it } from "bun:test";
import { minimumGenerationsToTargetPoint as minGenerations } from ".";

describe("3923. Minimum Generations to Target Point", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minGenerations(
				[
					[0, 0, 0],
					[6, 6, 6],
				],
				[3, 3, 3],
			),
		).toBe(1);
		expect(
			minGenerations(
				[
					[0, 0, 0],
					[5, 5, 5],
				],
				[1, 1, 1],
			),
		).toBe(2);
		expect(
			minGenerations(
				[
					[0, 0, 0],
					[2, 2, 2],
					[3, 3, 3],
				],
				[2, 2, 2],
			),
		).toBe(0);
		expect(minGenerations([[1, 2, 3]], [5, 5, 5])).toBe(-1);
	});
});
