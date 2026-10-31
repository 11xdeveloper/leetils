import { describe, expect, it } from "bun:test";
import { checkIfGridCanBeCutIntoSections as checkValidCuts } from ".";

describe("3394. Check if Grid can be Cut into Sections", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkValidCuts(5, [
				[1, 0, 5, 2],
				[0, 2, 2, 4],
				[3, 2, 5, 3],
				[0, 4, 4, 5],
			]),
		).toBeTrue();
		expect(
			checkValidCuts(4, [
				[0, 0, 1, 1],
				[2, 0, 3, 4],
				[0, 2, 2, 3],
				[3, 0, 4, 3],
			]),
		).toBeTrue();
		expect(
			checkValidCuts(4, [
				[0, 2, 2, 4],
				[1, 0, 3, 2],
				[2, 2, 3, 4],
				[3, 0, 4, 2],
				[3, 2, 4, 4],
			]),
		).toBeFalse();
	});
});
