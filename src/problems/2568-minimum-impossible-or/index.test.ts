import { describe, expect, it } from "bun:test";
import { minimumImpossibleOr } from ".";

describe("2568. Minimum Impossible OR", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumImpossibleOr([2, 1])).toBe(4);
		expect(minimumImpossibleOr([5, 3, 2])).toBe(1);
	});
});
