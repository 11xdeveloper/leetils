import { describe, expect, it } from "bun:test";
import { sumOfRemotenessOfAllCells as sumRemoteness } from ".";

describe("2852. Sum of Remoteness of All Cells", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumRemoteness([
				[-1, 1, -1],
				[5, -1, 4],
				[-1, 3, -1],
			]),
		).toBe(39);
		expect(
			sumRemoteness([
				[-1, 3, 4],
				[-1, -1, -1],
				[3, -1, -1],
			]),
		).toBe(13);
		expect(sumRemoteness([[1]])).toBe(0);
	});
});
