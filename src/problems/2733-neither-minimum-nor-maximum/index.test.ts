import { describe, expect, it } from "bun:test";
import { neitherMinimumNorMaximum as findNonMinOrMax } from ".";

describe("2733. Neither Minimum nor Maximum", () => {
	it("solves the examples from the problem statement", () => {
		expect([2, 3]).toContain(findNonMinOrMax([3, 2, 1, 4]));
		expect(findNonMinOrMax([1, 2])).toBe(-1);
		expect(findNonMinOrMax([2, 1, 3])).toBe(2);
	});
});
