import { describe, expect, it } from "bun:test";
import { checkAdjacentDigitDifferences as isAdjacentDiffAtMostTwo } from ".";

describe("3931. Check Adjacent Digit Differences", () => {
	it("solves the examples from the problem statement", () => {
		expect(isAdjacentDiffAtMostTwo("132")).toBeTrue();
		expect(isAdjacentDiffAtMostTwo("129")).toBeFalse();
	});
});
