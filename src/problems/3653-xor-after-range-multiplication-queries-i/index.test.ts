import { describe, expect, it } from "bun:test";
import { xorAfterRangeMultiplicationQueriesI as xorAfterQueries } from ".";

describe("3653. XOR After Range Multiplication Queries I", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorAfterQueries([1, 1, 1], [[0, 2, 1, 4]])).toBe(4);
		expect(
			xorAfterQueries(
				[2, 3, 1, 5, 4],
				[
					[1, 4, 2, 3],
					[0, 2, 1, 2],
				],
			),
		).toBe(31);
	});

	it("reduces products modulo 1e9+7", () => {
		expect(xorAfterQueries([1_000_000_000], [[0, 0, 1, 100_000]])).toBe(
			999_300_007,
		);
	});
});
