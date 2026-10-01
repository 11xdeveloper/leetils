import { describe, expect, it } from "bun:test";
import { validMountainArray } from ".";

describe("941. Valid Mountain Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(validMountainArray([2, 1])).toBeFalse();
		expect(validMountainArray([3, 5, 5])).toBeFalse();
		expect(validMountainArray([0, 3, 2, 1])).toBeTrue();
	});

	it("rejects arrays that only rise or only fall", () => {
		expect(validMountainArray([1, 2, 3])).toBeFalse();
		expect(validMountainArray([3, 2, 1])).toBeFalse();
	});
});
