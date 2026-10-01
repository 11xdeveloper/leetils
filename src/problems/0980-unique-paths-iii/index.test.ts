import { describe, expect, it } from "bun:test";
import { uniquePathsIII } from ".";

describe("980. Unique Paths III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			uniquePathsIII([
				[1, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 2, -1],
			]),
		).toBe(2);
		expect(
			uniquePathsIII([
				[1, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
			]),
		).toBe(4);
		expect(
			uniquePathsIII([
				[0, 1],
				[2, 0],
			]),
		).toBe(0);
	});

	it("handles adjacent start and end with nothing else", () => {
		expect(uniquePathsIII([[1, 2]])).toBe(1);
		expect(uniquePathsIII([[1, -1, 2]])).toBe(0);
	});
});
