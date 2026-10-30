import { describe, expect, it } from "bun:test";
import { countArtifactsThatCanBeExtracted as digArtifacts } from ".";

describe("2201. Count Artifacts That Can Be Extracted", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			digArtifacts(
				2,
				[
					[0, 0, 0, 0],
					[0, 1, 1, 1],
				],
				[
					[0, 0],
					[0, 1],
				],
			),
		).toBe(1);
		expect(
			digArtifacts(
				2,
				[
					[0, 0, 0, 0],
					[0, 1, 1, 1],
				],
				[
					[0, 0],
					[0, 1],
					[1, 1],
				],
			),
		).toBe(2);
	});
});
