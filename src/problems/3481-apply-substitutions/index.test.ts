import { describe, expect, it } from "bun:test";
import { applySubstitutions } from ".";

describe("3481. Apply Substitutions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			applySubstitutions(
				[
					["A", "abc"],
					["B", "def"],
				],
				"%A%_%B%",
			),
		).toBe("abc_def");
		expect(
			applySubstitutions(
				[
					["A", "bce"],
					["B", "ace"],
					["C", "abc%B%"],
				],
				"%A%_%B%_%C%",
			),
		).toBe("bce_ace_abcace");
	});
});
