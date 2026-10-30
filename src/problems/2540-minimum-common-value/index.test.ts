import { describe, expect, it } from "bun:test";
import { minimumCommonValue as getCommon } from ".";

describe("2540. Minimum Common Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(getCommon([1, 2, 3], [2, 4])).toBe(2);
		expect(getCommon([1, 2, 3, 6], [2, 3, 4, 5])).toBe(2);
	});

	it("returns -1 when nothing is shared", () => {
		expect(getCommon([1, 3], [2, 4])).toBe(-1);
	});
});
