import { describe, expect, it } from "bun:test";
import { minimumLevelsToGainMorePoints as minimumLevels } from ".";

describe("3096. Minimum Levels to Gain More Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumLevels([1, 0, 1, 0])).toBe(1);
		expect(minimumLevels([1, 1, 1, 1, 1])).toBe(3);
		expect(minimumLevels([0, 0])).toBe(-1);
	});
});
