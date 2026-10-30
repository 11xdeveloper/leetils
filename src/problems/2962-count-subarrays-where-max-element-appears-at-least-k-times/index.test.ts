import { describe, expect, it } from "bun:test";
import { countSubarraysWhereMaxElementAppearsAtLeastKTimes as countSubarrays } from ".";

describe("2962. Count Subarrays Where Max Element Appears at Least K Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 3, 2, 3, 3], 2)).toBe(6);
		expect(countSubarrays([1, 4, 2, 1], 3)).toBe(0);
	});
});
