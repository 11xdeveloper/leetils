import { describe, expect, it } from "bun:test";
import { maximumConsecutiveFloorsWithoutSpecialFloors as maxConsecutive } from ".";

describe("2274. Maximum Consecutive Floors Without Special Floors", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxConsecutive(2, 9, [4, 6])).toBe(3);
		expect(maxConsecutive(6, 8, [7, 6, 8])).toBe(0);
	});
});
