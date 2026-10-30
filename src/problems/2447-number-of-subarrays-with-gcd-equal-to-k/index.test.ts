import { describe, expect, it } from "bun:test";
import { numberOfSubarraysWithGcdEqualToK as subarrayGCD } from ".";

describe("2447. Number of Subarrays With GCD Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarrayGCD([9, 3, 1, 2, 6, 3], 3)).toBe(4);
		expect(subarrayGCD([4], 7)).toBe(0);
	});
});
