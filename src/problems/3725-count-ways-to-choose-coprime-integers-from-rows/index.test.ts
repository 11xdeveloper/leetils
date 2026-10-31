import { describe, expect, it } from "bun:test";
import { countWaysToChooseCoprimeIntegersFromRows as countCoprime } from ".";

describe("3725. Count Ways to Choose Coprime Integers from Rows", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countCoprime([
				[1, 2],
				[3, 4],
			]),
		).toBe(3);
		expect(
			countCoprime([
				[2, 2],
				[2, 2],
			]),
		).toBe(0);
	});
});
