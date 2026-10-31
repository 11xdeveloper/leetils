import { describe, expect, it } from "bun:test";
import { maximumBeautyOfAnArrayAfterApplyingOperation as maximumBeauty } from ".";

describe("2779. Maximum Beauty of an Array After Applying Operation", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBeauty([4, 6, 1, 2], 2)).toBe(3);
		expect(maximumBeauty([1, 1, 1, 1], 10)).toBe(4);
	});
});
