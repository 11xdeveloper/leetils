import { describe, expect, it } from "bun:test";
import { checkForContradictionsInEquations as checkContradictions } from ".";

describe("2307. Check for Contradictions in Equations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkContradictions(
				[
					["a", "b"],
					["b", "c"],
					["a", "c"],
				],
				[3, 0.5, 1.5],
			),
		).toBeFalse();
		expect(
			checkContradictions(
				[
					["le", "et"],
					["le", "code"],
					["code", "et"],
				],
				[2, 5, 0.5],
			),
		).toBeTrue();
	});

	it("checks equations joining long chains", () => {
		expect(
			checkContradictions(
				[
					["a", "b"],
					["c", "d"],
					["b", "c"],
					["a", "d"],
				],
				[2, 3, 5, 30],
			),
		).toBeFalse();
		expect(
			checkContradictions(
				[
					["a", "b"],
					["c", "d"],
					["b", "c"],
					["d", "a"],
				],
				[2, 3, 5, 30],
			),
		).toBeTrue();
	});
});
