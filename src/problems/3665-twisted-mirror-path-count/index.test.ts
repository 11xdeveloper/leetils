import { describe, expect, it } from "bun:test";
import { twistedMirrorPathCount as uniquePaths } from ".";

describe("3665. Twisted Mirror Path Count", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			uniquePaths([
				[0, 1, 0],
				[0, 0, 1],
				[1, 0, 0],
			]),
		).toBe(5);
		expect(
			uniquePaths([
				[0, 0],
				[0, 0],
			]),
		).toBe(2);
		expect(
			uniquePaths([
				[0, 1, 1],
				[1, 1, 0],
			]),
		).toBe(1);
	});
});
