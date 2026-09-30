import { describe, expect, it } from "bun:test";
import { validBoomerang as isBoomerang } from ".";

describe("1037. Valid Boomerang", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isBoomerang([
				[1, 1],
				[2, 3],
				[3, 2],
			]),
		).toBeTrue();
		expect(
			isBoomerang([
				[1, 1],
				[2, 2],
				[3, 3],
			]),
		).toBeFalse();
	});

	it("rejects repeated points", () => {
		expect(
			isBoomerang([
				[0, 0],
				[0, 0],
				[1, 2],
			]),
		).toBeFalse();
	});
});
