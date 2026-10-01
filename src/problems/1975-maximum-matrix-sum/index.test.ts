import { describe, expect, it } from "bun:test";
import { maximumMatrixSum as maxMatrixSum } from ".";

describe("1975. Maximum Matrix Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxMatrixSum([
				[1, -1],
				[-1, 1],
			]),
		).toBe(4);
		expect(
			maxMatrixSum([
				[1, 2, 3],
				[-1, -2, -3],
				[1, 2, 3],
			]),
		).toBe(16);
	});

	it("uses a zero to absorb a leftover sign", () => {
		expect(
			maxMatrixSum([
				[-1, 0],
				[2, 3],
			]),
		).toBe(6);
	});
});
