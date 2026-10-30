import { describe, expect, it } from "bun:test";
import { checkIfMatrixIsXMatrix as checkXMatrix } from ".";

describe("2319. Check if Matrix Is X-Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkXMatrix([
				[2, 0, 0, 1],
				[0, 3, 1, 0],
				[0, 5, 2, 0],
				[4, 0, 0, 2],
			]),
		).toBeTrue();
		expect(
			checkXMatrix([
				[5, 7, 0],
				[0, 3, 1],
				[0, 5, 0],
			]),
		).toBeFalse();
	});
});
